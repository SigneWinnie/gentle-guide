import { Component, inject, signal } from '@angular/core';
import { SchedulesApi } from '../../api/schedules.api';
import type { Schedule } from '../../api/api.types';
import { asErrorMessage, type LoadState } from '../../shared/ui';
import { DataTableComponent } from '../../shared/data-table.component';

@Component({
  selector: 'app-schedules-page',
  imports: [DataTableComponent],
  template: `
    <div class="page">
      <div class="page__header">
        <div>
          <h1>Schedules</h1>
          <p class="muted">Data source: <code>/schedules</code></p>
        </div>
        <button class="btn" type="button" (click)="reload()">Reload</button>
      </div>

      @switch (state().status) {
        @case ('loading') {
          <div class="muted">Loading…</div>
        }
        @case ('error') {
          <div class="error">{{ state().message }}</div>
        }
        @case ('success') {
          @let data = state().data ?? [];
          <app-data-table
            [headers]="[
              'ID',
              'Course',
              'Room',
              'Day',
              'Start',
              'End',
              'Academic year',
              'Active'
            ]"
          >
            @for (s of data; track s.id) {
              <tr>
                <td>{{ s.id }}</td>
                <td>{{ s.course?.code ?? '-' }} — {{ s.course?.name ?? '-' }}</td>
                <td>
                  {{ s.room?.roomNumber ?? '-' }} ({{ s.room?.building ?? '-' }})
                </td>
                <td>{{ s.dayOfWeek ?? '-' }}</td>
                <td>{{ s.startTime ?? '-' }}</td>
                <td>{{ s.endTime ?? '-' }}</td>
                <td>{{ s.academicYear ?? '-' }}</td>
                <td>{{ s.active === false ? 'No' : 'Yes' }}</td>
              </tr>
            }
          </app-data-table>

          @if (data.length === 0) {
            <div class="muted" style="margin-top: 10px">
              No schedules found in the database.
            </div>
          }
        }
        @default {
          <div class="muted">Idle</div>
        }
      }
    </div>
  `,
  styles: `
    h1 {
      margin: 0;
      font-size: 22px;
      color: rgba(255, 255, 255, 0.92);
    }
    .page {
      max-width: 1200px;
    }
    .page__header {
      display: flex;
      align-items: start;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 14px;
    }
    .muted {
      margin: 6px 0 0;
      color: rgba(255, 255, 255, 0.6);
    }
    code {
      color: rgba(255, 255, 255, 0.85);
    }
    .btn {
      cursor: pointer;
      border-radius: 10px;
      padding: 10px 12px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      background: rgba(255, 255, 255, 0.06);
      color: rgba(255, 255, 255, 0.9);
      font-weight: 600;
    }
    .btn:hover {
      background: rgba(255, 255, 255, 0.09);
    }
    .error {
      color: #fecaca;
      background: rgba(239, 68, 68, 0.12);
      border: 1px solid rgba(239, 68, 68, 0.22);
      padding: 10px 12px;
      border-radius: 10px;
    }
  `,
})
export class SchedulesPage {
  private readonly api = inject(SchedulesApi);
  protected readonly state = signal<LoadState<Schedule[]>>({ status: 'loading' });

  constructor() {
    this.reload();
  }

  reload() {
    this.state.set({ status: 'loading' });
    this.api.list().subscribe({
      next: (data) => this.state.set({ status: 'success', data }),
      error: (err) =>
        this.state.set({ status: 'error', message: asErrorMessage(err) }),
    });
  }
}

