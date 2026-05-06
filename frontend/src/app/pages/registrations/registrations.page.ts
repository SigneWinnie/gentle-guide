import { Component, inject, signal } from '@angular/core';
import { RegistrationsApi } from '../../api/registrations.api';
import { StudentsApi } from '../../api/students.api';
import { CoursesApi } from '../../api/courses.api';
import type { Registration, Student, Course } from '../../api/api.types';
import { asErrorMessage, type LoadState } from '../../shared/ui';

type RegForm = {
  studentId: number | null;
  courseId: number | null;
  academicYear: string;
};

@Component({
  selector: 'app-registrations-page',
  standalone: true,
  templateUrl: './registrations.page.html',
  styleUrls: ['./registrations.page.scss'],
})
export class RegistrationsPage {
  private readonly regApi = inject(RegistrationsApi);
  private readonly studentsApi = inject(StudentsApi);
  private readonly coursesApi = inject(CoursesApi);

  protected readonly state = signal<LoadState<Registration[]>>({ status: 'loading' });
  protected readonly students = signal<Student[]>([]);
  protected readonly courses = signal<Course[]>([]);
  protected readonly showForm = signal(false);
  protected readonly form = signal<RegForm>({
    studentId: null,
    courseId: null,
    academicYear: '2025-2026',
  });

  constructor() {
    this.reload();
    this.studentsApi.list().subscribe({ next: (list) => this.students.set(list) });
    this.coursesApi.list().subscribe({ next: (list) => this.courses.set(list) });
  }

  protected reload() {
    this.state.set({ status: 'loading' });
    this.regApi.list().subscribe({
      next: (data) => this.state.set({ status: 'success', data }),
      error: (err) =>
        this.state.set({ status: 'error', message: asErrorMessage(err) }),
    });
  }

  // Resolve student name from the already-loaded students list using the flat studentId
  protected getStudentName(r: Registration): string {
    const student = this.students().find((s) => s.id === r.studentId);
    if (!student) return `Student #${r.studentId ?? '—'}`;
    return `${student.firstName ?? ''} ${student.lastName ?? ''}`.trim() || student.matricule || '—';
  }

  // Resolve course name from the already-loaded courses list using the flat courseId
  protected getCourseName(r: Registration): string {
    const course = this.courses().find((c) => c.id === r.courseId);
    if (!course) return `Course #${r.courseId ?? '—'}`;
    return `${course.code ?? ''} — ${course.name ?? ''}`.trim() || '—';
  }

  protected openCreate() {
    this.form.set({
      studentId: null,
      courseId: null,
      academicYear: '2025-2026',
    });
    this.showForm.set(true);
  }

  protected closeForm() {
    this.showForm.set(false);
  }

  protected updateField<K extends keyof RegForm>(key: K, value: RegForm[K]) {
    this.form.update((f) => ({ ...f, [key]: value }));
  }

  protected submit(e?: Event) {
    e?.preventDefault();
    const f = this.form();
    if (f.studentId == null || f.courseId == null) return;

    // Send flat studentId and courseId — this is what the backend expects
    this.regApi
      .create({
        studentId: f.studentId,
        courseId: f.courseId,
        academicYear: f.academicYear,
        status: 'ACTIVE',
      })
      .subscribe({
        next: () => {
          this.closeForm();
          this.reload();
        },
        error: (err) =>
          this.state.set({ status: 'error', message: asErrorMessage(err) }),
      });
  }

  protected updateStatus(r: Registration, newStatus: 'ACTIVE' | 'COMPLETED' | 'CANCELLED') {
    this.regApi.update(r.id, { ...r, status: newStatus }).subscribe({
      next: () => this.reload(),
      error: (err) =>
        this.state.set({ status: 'error', message: asErrorMessage(err) }),
    });
  }

  protected deleteRegistration(r: Registration) {
    if (!confirm('Delete this registration?')) return;
    this.regApi.delete(r.id).subscribe({
      next: () => this.reload(),
      error: (err) =>
        this.state.set({ status: 'error', message: asErrorMessage(err) }),
    });
  }

  protected statusClass(status: string | null | undefined): string {
    switch (status) {
      case 'COMPLETED':
        return 'reg-status reg-status--success';
      case 'ACTIVE':
        return 'reg-status reg-status--warning';
      case 'CANCELLED':
        return 'reg-status reg-status--destructive';
      default:
        return 'reg-status';
    }
  }
}