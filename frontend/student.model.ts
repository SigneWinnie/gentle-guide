export interface Student {
  id?: number;
  matricule: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'M' | 'F';
  address: string;
  department: string;
  level: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface StudentDTO {
  id?: number;
  matricule: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth: string;
  gender: 'M' | 'F';
  address?: string;
  department: string;
  level: string;
}

export interface StudentResponse {
  data: Student[];
  totalCount?: number;
  message?: string;
}
