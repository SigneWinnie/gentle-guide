export interface Registration {
  id?: number;
  student: any;
  course: any;
  academicYear: string;
  registrationDate?: string;
  status: RegistrationStatus;
  completionDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export enum RegistrationStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  DROPPED = 'DROPPED',
  WITHDRAWN = 'WITHDRAWN'
}

export interface RegistrationDTO {
  id?: number;
  studentId: number;
  courseId: number;
  academicYear: string;
  status: RegistrationStatus;
}

export interface RegistrationResponse {
  data: Registration[];
  totalCount?: number;
  message?: string;
}
