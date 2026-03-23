export interface Student {
  id: number;
  matricule: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  phone?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
  address?: string | null;
  department?: string | null;
  level?: string | null;
  active?: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface Course {
  id: number;
  code: string;
  name: string;
  credits?: number | null;
  department?: string | null;
  semester?: number | null;
  description?: string | null;
  active?: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface Grade {
  id: number;
  student: Student;
  course: Course;
  academicYear?: string | null;
  ccScore?: number | null;
  examScore?: number | null;
  finalScore?: number | null;
  status?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface Registration {
  id: number;
  student: Student;
  course: Course;
  academicYear?: string | null;
  status?: 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | string | null;
  completionDate?: string | null;
  active?: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface Room {
  id: number;
  roomNumber: string;
  building: string;
  capacity?: number | null;
  roomType?: string | null;
  facilities?: string | null;
  active?: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface Schedule {
  id: number;
  course: Course;
  room: Room;
  dayOfWeek?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  academicYear?: string | null;
  active?: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  recipient: string;
  read?: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

