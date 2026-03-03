export interface Course {
  id?: number;
  code: string;
  name: string;
  credits: number;
  department: string;
  semester: number;
  description?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CourseDTO {
  id?: number;
  code: string;
  name: string;
  credits: number;
  department: string;
  semester: number;
  description?: string;
}

export interface CourseResponse {
  data: Course[];
  totalCount?: number;
  message?: string;
}
