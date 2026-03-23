import { Injectable, inject } from '@angular/core';
import { ApiClient } from './api.client';
import type { Student } from './api.types';

@Injectable({ providedIn: 'root' })
export class StudentsApi {
  private readonly api = inject(ApiClient);

  list() {
    return this.api.get<Student[]>('/api/students');
  }

  create(student: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.api.post<Student>('/api/students', student);
  }

  update(id: number, student: Partial<Student>) {
    return this.api.put<Student>(`/api/students/${id}`, student);
  }

  delete(id: number) {
    return this.api.delete(`/api/students/${id}`);
  }
}

