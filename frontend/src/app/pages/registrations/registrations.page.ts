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
    academicYear: '2024-2025',
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

  protected getStudentName(r: Registration): string {
    const s = r.student;
    if (!s) return '—';
    return `${s.firstName ?? ''} ${s.lastName ?? ''}`.trim() || s.matricule || '—';
  }

  protected openCreate() {
    this.form.set({
      studentId: null,
      courseId: null,
      academicYear: '2024-2025',
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
    this.regApi
      .create({
        student: { id: f.studentId },
        course: { id: f.courseId },
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
