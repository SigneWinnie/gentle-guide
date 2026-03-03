import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course, CourseDTO } from '../models/course.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = `${environment.apiUrl}/courses`;

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  getCourseByCode(code: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/code/${code}`);
  }

  getCoursesByDepartment(department: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/department/${department}`);
  }

  getCoursesBySemester(semester: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/semester/${semester}`);
  }

  createCourse(course: CourseDTO): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  updateCourse(id: number, course: CourseDTO): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getActiveCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/active/list`);
  }
}
