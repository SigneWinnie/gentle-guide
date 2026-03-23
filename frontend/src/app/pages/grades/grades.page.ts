import { Component, inject, signal, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { GradesApi } from '../../api/grades.api';
import { StudentsApi } from '../../api/students.api';
import { CoursesApi } from '../../api/courses.api';
import type { Grade, Student, Course } from '../../api/api.types';
import { asErrorMessage, type LoadState } from '../../shared/ui';

type GradeForm = {
  studentId: number | null;
  courseId: number | null;
  academicYear: string;
  ccScore: number;
  examScore: number;
};

@Component({
  selector: 'app-grades-page',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './grades.page.html',
  styleUrls: ['./grades.page.scss'],
})
export class GradesPage {
  private readonly gradesApi = inject(GradesApi);
  private readonly studentsApi = inject(StudentsApi);
  private readonly coursesApi = inject(CoursesApi);

  protected readonly state = signal<LoadState<Grade[]>>({ status: 'loading' });
  protected readonly students = signal<Student[]>([]);
  protected readonly courses = signal<Course[]>([]);
  protected readonly showForm = signal(false);
  protected readonly form = signal<GradeForm>({
    studentId: null,
    courseId: null,
    academicYear: '2024-2025',
    ccScore: 0,
    examScore: 0,
  });

  protected readonly finalScore = computed(() => {
    const f = this.form();
    return f.ccScore * 0.4 + f.examScore * 0.6;
  });

  constructor() {
    this.reload();
    this.studentsApi.list().subscribe({ next: (list) => this.students.set(list) });
    this.coursesApi.list().subscribe({ next: (list) => this.courses.set(list) });
  }

  protected reload() {
    this.state.set({ status: 'loading' });
    this.gradesApi.list().subscribe({
      next: (data) => this.state.set({ status: 'success', data }),
      error: (err) =>
        this.state.set({ status: 'error', message: asErrorMessage(err) }),
    });
  }

  protected getStudentName(g: Grade): string {
    const s = g.student;
    if (!s) return '—';
    return `${s.firstName ?? ''} ${s.lastName ?? ''}`.trim() || s.matricule || '—';
  }

  protected getCourseName(g: Grade): string {
    const c = g.course;
    if (!c) return '—';
    return `${c.code ?? ''} — ${c.name ?? ''}`.trim() || '—';
  }

  protected openCreate() {
    this.form.set({
      studentId: null,
      courseId: null,
      academicYear: '2024-2025',
      ccScore: 0,
      examScore: 0,
    });
    this.showForm.set(true);
  }

  protected closeForm() {
    this.showForm.set(false);
  }

  protected updateField<K extends keyof GradeForm>(key: K, value: GradeForm[K]) {
    this.form.update((f) => ({ ...f, [key]: value }));
  }

  protected submit(e?: Event) {
    e?.preventDefault();
    const f = this.form();
    if (f.studentId == null || f.courseId == null) return;
    const final = f.ccScore * 0.4 + f.examScore * 0.6;
    const status = final >= 10 ? 'PASSED' : 'FAILED';
    this.gradesApi
      .create({
        student: { id: f.studentId },
        course: { id: f.courseId },
        academicYear: f.academicYear,
        ccScore: f.ccScore,
        examScore: f.examScore,
        finalScore: Math.round(final * 100) / 100,
        status,
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

  protected deleteGrade(g: Grade) {
    if (!confirm('Delete this grade?')) return;
    this.gradesApi.delete(g.id).subscribe({
      next: () => this.reload(),
      error: (err) =>
        this.state.set({ status: 'error', message: asErrorMessage(err) }),
    });
  }

  protected gradeClass(status: string | null | undefined): string {
    if (status === 'PASSED') return 'grade-badge grade-badge--success';
    if (status === 'FAILED') return 'grade-badge grade-badge--destructive';
    return 'grade-badge';
  }
}
