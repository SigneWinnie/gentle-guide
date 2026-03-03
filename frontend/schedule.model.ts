export interface Schedule {
  id?: number;
  course: any;
  room: any;
  dayOfWeek?: string;
  startTime?: string;
  endTime?: string;
  academicYear?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ScheduleDTO {
  id?: number;
  courseId: number;
  roomId: number;
  dayOfWeek?: string;
  startTime?: string;
  endTime?: string;
  academicYear?: string;
}

export interface ScheduleResponse {
  data: Schedule[];
  totalCount?: number;
  message?: string;
}

export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY'
}
