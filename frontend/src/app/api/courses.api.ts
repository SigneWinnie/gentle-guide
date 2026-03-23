import { Injectable, inject } from '@angular/core';
import { ApiClient } from './api.client';
import type { Course } from './api.types';

@Injectable({ providedIn: 'root' })
export class CoursesApi {
  private readonly api = inject(ApiClient);

  list() {
    return this.api.get<Course[]>('/api/courses');
  }

  create(body: Partial<Course>) {
    return this.api.post<Course>('/api/courses', body);
  }

  update(id: number, body: Partial<Course>) {
    return this.api.put<Course>(`/api/courses/${id}`, body);
  }

  delete(id: number) {
    return this.api.delete(`/api/courses/${id}`);
  }
}

