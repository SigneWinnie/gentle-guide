export interface Grade {
  id?: number;
  student: any;
  course: any;
  academicYear: string;
  ccScore: number;
  examScore: number;
  finalScore?: number;
  gradeLetter?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GradeDTO {
  id?: number;
  studentId: number;
  courseId: number;
  academicYear: string;
  ccScore: number;
  examScore: number;
}

export interface GradeResponse {
  data: Grade[];
  totalCount?: number;
  message?: string;
}
