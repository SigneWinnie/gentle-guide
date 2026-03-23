import { Injectable, inject } from '@angular/core';
import { ApiClient } from './api.client';
import type { Registration } from './api.types';

@Injectable({ providedIn: 'root' })
export class RegistrationsApi {
  private readonly api = inject(ApiClient);

  list() {
    return this.api.get<Registration[]>('/api/registrations');
  }

  create(body: { student: { id: number }; course: { id: number }; academicYear: string; status?: string }) {
    return this.api.post<Registration>('/api/registrations', body);
  }

  update(id: number, body: Partial<Registration>) {
    return this.api.put<Registration>(`/api/registrations/${id}`, body);
  }

  delete(id: number) {
    return this.api.delete(`/api/registrations/${id}`);
  }
}

