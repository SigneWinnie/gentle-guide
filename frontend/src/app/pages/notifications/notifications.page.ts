import { Component, inject, signal, computed } from '@angular/core';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationsApi } from '../../api/notifications.api';
import type { Notification } from '../../api/api.types';
import { asErrorMessage, type LoadState } from '../../shared/ui';
import { DataTableComponent } from '../../shared/data-table.component';

type NotificationForm = Omit<Notification, 'id' | 'createdAt' | 'updatedAt' | 'read'> & {
  read?: boolean | null;
};

@Component({
  selector: 'app-notifications-page',
  standalone: true,
  imports: [DataTableComponent, NgIf, NgFor, NgClass, FormsModule, DatePipe],
  template: `
    <div class="page">
      <div class="header">
        <div>
          <h2>Notifications</h2>
          <p class="sub">Manage system notifications</p>
        </div>
        <button class="primary" type="button" (click)="openCreate()">
          Send Notification
        </button>
      </div>

      <div class="search">
        <input
          type="text"
          placeholder="Search notifications..."
          [value]="search()"
          (input)="search.set($any($event.target).value)"
        />
      </div>

      <app-data-table [headers]="['Title', 'Message', 'Recipient', 'Read', 'Created', 'Actions']">
        <tr *ngFor="let n of filtered()" [ngClass]="{ 'row-hover': true }">
          <td>{{ n.title }}</td>
          <td class="muted">{{ n.message }}</td>
          <td>{{ n.recipient }}</td>
          <td>
            <span class="pill" [ngClass]="n.read ? 'pill--success' : 'pill--warning'">
              {{ n.read ? 'Read' : 'Unread' }}
            </span>
          </td>
          <td class="muted">{{ n.createdAt | date:'short' }}</td>
          <td>
            <button type="button" (click)="markAsRead(n.id)" [disabled]="n.read" class="btn btn--small">
              Mark Read
            </button>
            <button type="button" (click)="deleteNotification(n.id)" class="btn btn--small btn--danger">
              Delete
            </button>
          </td>
        </tr>
        <tr *ngIf="filtered().length === 0 && state().status === 'success'">
          <td class="empty" colspan="6">No notifications found</td>
        </tr>
        <tr *ngIf="state().status === 'loading'">
          <td class="empty" colspan="6">Loading...</td>
        </tr>
        <tr *ngIf="state().status === 'error'">
          <td class="empty" colspan="6">{{ state().message }}</td>
        </tr>
      </app-data-table>

      <ng-container *ngIf="showForm()">
        <div class="modal">
          <div class="modal__content">
            <h3>{{ editingId() ? 'Edit' : 'Create' }} Notification</h3>
            <form (ngSubmit)="handleSubmit()">
              <div class="form-group">
                <label>Title</label>
                <input type="text" [(ngModel)]="formData.title" name="title" required />
              </div>
              <div class="form-group">
                <label>Message</label>
                <textarea [(ngModel)]="formData.message" name="message" required></textarea>
              </div>
              <div class="form-group">
                <label>Recipient</label>
                <input type="email" [(ngModel)]="formData.recipient" name="recipient" required />
              </div>
              <div class="form-actions">
                <button type="button" (click)="showForm.set(false)">Cancel</button>
                <button type="submit" class="primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </ng-container>
    </div>
  `,
  styles: `
    .page { max-width: 1200px; }
    .header { display: flex; flex-direction: column; gap: 12px; justify-content: space-between; margin-bottom: 16px; }
    @media (min-width: 640px) { .header { flex-direction: row; align-items: center; } }
    h2 { margin: 0; font-size: 1.5rem; font-weight: 800; color: hsl(var(--foreground)); }
    .sub { margin: 4px 0 0; font-size: 0.875rem; color: hsl(var(--muted-foreground)); }
    .primary { border: 0; cursor: pointer; border-radius: 0.75rem; padding: 0.65rem 1rem; background: hsl(var(--primary)); color: hsl(var(--primary-foreground)); font-weight: 700; }
    .primary:hover { opacity: 0.92; }
    .muted { color: hsl(var(--muted-foreground)); }
    .pill { display: inline-flex; align-items: center; padding: 0.125rem 0.5rem; border-radius: 0.5rem; font-size: 0.75rem; font-weight: 800; }
    .pill--success { background: hsl(var(--success) / 0.15); color: hsl(var(--success)); }
    .pill--warning { background: hsl(var(--warning) / 0.15); color: hsl(var(--warning)); }
    .empty { padding: 1.75rem 1rem; text-align: center; color: hsl(var(--muted-foreground)); }
    .search { margin-bottom: 16px; }
    .search input { width: 100%; max-width: 400px; padding: 0.5rem; border: 1px solid hsl(var(--border)); border-radius: 0.5rem; }
    .btn { border: 0; cursor: pointer; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; margin-right: 0.25rem; }
    .btn--small { padding: 0.25rem 0.5rem; }
    .btn--danger { background: hsl(var(--destructive)); color: hsl(var(--destructive-foreground)); }
    .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal__content { background: white; padding: 2rem; border-radius: 0.5rem; width: 90%; max-width: 500px; }
    .form-group { margin-bottom: 1rem; }
    .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; }
    .form-group input, .form-group textarea { width: 100%; padding: 0.5rem; border: 1px solid hsl(var(--border)); border-radius: 0.25rem; }
    .form-actions { display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1rem; }
  `,
})
export class NotificationsPage {
  private readonly api = inject(NotificationsApi);
  protected readonly state = signal<LoadState<Notification[]>>({ status: 'loading' });

  protected readonly search = signal('');
  protected readonly showForm = signal(false);
  protected readonly editingId = signal<number | null>(null);

  protected formData: NotificationForm = {
    title: '',
    message: '',
    recipient: '',
    read: false,
  };

  protected readonly filtered = computed(() => {
    const term = this.search().toLowerCase();
    const data = this.state().data ?? [];
    if (!term) return data;
    return data.filter((n) =>
      `${n.title} ${n.message} ${n.recipient}`.toLowerCase().includes(term),
    );
  });

  constructor() {
    this.reload();
  }

  protected reload() {
    this.state.set({ status: 'loading' });
    this.api.list().subscribe({
      next: (data) => this.state.set({ status: 'success', data }),
      error: (err) =>
        this.state.set({ status: 'error', message: asErrorMessage(err) }),
    });
  }

  protected openCreate() {
    this.editingId.set(null);
    this.formData = {
      title: '',
      message: '',
      recipient: '',
      read: false,
    };
    this.showForm.set(true);
  }

  protected handleSubmit() {
    const notification = { ...this.formData };
    // no update path for now, always create for simplicity
    this.api.create(notification).subscribe(() => {
      this.showForm.set(false);
      this.reload();
    });
  }

  protected markAsRead(id: number) {
    this.api.update(id, { read: true }).subscribe(() => this.reload());
  }

  protected deleteNotification(id: number) {
    this.api.delete(id).subscribe(() => this.reload());
  }
}

