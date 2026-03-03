import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student, StudentDTO } from '../models/student.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = `${environment.apiUrl}/students`;

  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  getStudentByMatricule(matricule: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/matricule/${matricule}`);
  }

  getStudentsByDepartment(department: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/department/${department}`);
  }

  getStudentsByLevel(level: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/level/${level}`);
  }

  createStudent(student: StudentDTO): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  updateStudent(id: number, student: StudentDTO): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchStudents(keyword: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/search?keyword=${keyword}`);
  }

  getActiveStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/active/list`);
  }
}
