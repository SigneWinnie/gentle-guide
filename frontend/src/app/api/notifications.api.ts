import { Injectable, inject } from '@angular/core';
import { ApiClient } from './api.client';
import type { Notification } from './api.types';

@Injectable({ providedIn: 'root' })
export class NotificationsApi {
  private readonly api = inject(ApiClient);

  list() {
    return this.api.get<Notification[]>('/api/notifications');
  }

  create(notification: Omit<Notification, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.api.post<Notification>('/api/notifications', notification);
  }

  update(id: number, notification: Partial<Notification>) {
    return this.api.put<Notification>(`/api/notifications/${id}`, notification);
  }

  delete(id: number) {
    return this.api.delete(`/api/notifications/${id}`);
  }
}