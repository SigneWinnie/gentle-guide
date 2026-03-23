import { Injectable, inject } from '@angular/core';
import { ApiClient } from './api.client';
import type { Grade } from './api.types';

@Injectable({ providedIn: 'root' })
export class GradesApi {
  private readonly api = inject(ApiClient);

  list() {
    return this.api.get<Grade[]>('/api/grades');
  }

  create(body: { student: { id: number }; course: { id: number }; academicYear: string; ccScore: number; examScore: number; finalScore?: number; status?: string }) {
    return this.api.post<Grade>('/grades', body);
  }

  delete(id: number) {
    return this.api.delete(`/grades/${id}`);
  }
}

