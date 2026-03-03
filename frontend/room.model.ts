export interface Room {
  id?: number;
  roomNumber: string;
  building: string;
  capacity: number;
  roomType?: string;
  facilities?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface RoomDTO {
  id?: number;
  roomNumber: string;
  building: string;
  capacity: number;
  roomType?: string;
  facilities?: string;
}

export interface RoomResponse {
  data: Room[];
  totalCount?: number;
  message?: string;
}
