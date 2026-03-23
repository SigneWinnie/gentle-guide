import { Injectable, inject } from '@angular/core';
import { ApiClient } from './api.client';
import type { Room } from './api.types';

@Injectable({ providedIn: 'root' })
export class RoomsApi {
  private readonly api = inject(ApiClient);

  list() {
    return this.api.get<Room[]>('/api/rooms');
  }

  create(body: Partial<Room>) {
    return this.api.post<Room>('/api/rooms', body);
  }

  update(id: number, body: Partial<Room>) {
    return this.api.put<Room>(`/api/rooms/${id}`, body);
  }

  delete(id: number) {
    return this.api.delete(`/api/rooms/${id}`);
  }
}

