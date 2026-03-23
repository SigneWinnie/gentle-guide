import { Injectable, inject } from '@angular/core';
import { ApiClient } from './api.client';
import type { Schedule } from './api.types';

@Injectable({ providedIn: 'root' })
export class SchedulesApi {
  private readonly api = inject(ApiClient);

  list() {
    return this.api.get<Schedule[]>('/api/schedules');
  }

  create(body: { course: { id: number }; room: { id: number }; dayOfWeek: string; startTime: string; endTime: string; academicYear?: string }) {
    return this.api.post<Schedule>('/schedules', body);
  }

  delete(id: number) {
    return this.api.delete(`/schedules/${id}`);
  }
}

