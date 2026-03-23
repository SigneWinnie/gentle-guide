import { Component, inject, signal } from '@angular/core';
import { CoursesApi } from '../../api/courses.api';
import type { Course } from '../../api/api.types';
import { asErrorMessage, type LoadState } from '../../shared/ui';

type CourseForm = {
  code: string;
  name: string;
  credits: number;
  department: string;
  semester: number;
};

@Component({
  selector: 'app-courses-page',
  standalone: true,
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage {
  private readonly api = inject(CoursesApi);
  protected readonly state = signal<LoadState<Course[]>>({ status: 'loading' });

  protected readonly showForm = signal(false);
  protected readonly editingId = signal<number | null>(null);
  protected readonly form = signal<CourseForm>({
    code: '',
    name: '',
    credits: 3,
    department: '',
    semester: 1,
  });

  constructor() {
    this.reload();
  }

  protected reload() {
    this.state.set({ status: 'loading' });
    this.api.list().subscribe({
      next: (data) => this.state.set({ status: 'success', data }),
      error: (err) =>
        this.state.set({ status: 'error', message: asErrorMessage(err) }),
    });
  }

  protected openCreate() {
    this.editingId.set(null);
    this.form.set({
      code: '',
      name: '',
      credits: 3,
      department: '',
      semester: 1,
    });
    this.showForm.set(true);
  }

  protected openEdit(c: Course) {
    this.editingId.set(c.id);
    this.form.set({
      code: c.code,
      name: c.name,
      credits: c.credits ?? 3,
      department: c.department ?? '',
      semester: c.semester ?? 1,
    });
    this.showForm.set(true);
  }

  protected closeForm() {
    this.showForm.set(false);
  }

  protected updateField<K extends keyof CourseForm>(key: K, value: CourseForm[K]) {
    this.form.update((f) => ({ ...f, [key]: value }));
  }

  protected submit(e?: Event) {
    e?.preventDefault();
    const f = this.form();
    const id = this.editingId();
    const payload = {
      code: f.code,
      name: f.name,
      credits: f.credits,
      department: f.department || null,
      semester: f.semester,
    };
    if (id != null) {
      this.api.update(id, payload).subscribe({
        next: () => {
          this.closeForm();
          this.reload();
        },
        error: (err) =>
          this.state.set({ status: 'error', message: asErrorMessage(err) }),
      });
    } else {
      this.api.create(payload).subscribe({
        next: () => {
          this.closeForm();
          this.reload();
        },
        error: (err) =>
          this.state.set({ status: 'error', message: asErrorMessage(err) }),
      });
    }
  }

  protected deleteCourse(c: Course) {
    if (!confirm(`Delete course "${c.name}"?`)) return;
    this.api.delete(c.id).subscribe({
      next: () => this.reload(),
      error: (err) =>
        this.state.set({ status: 'error', message: asErrorMessage(err) }),
    });
  }
}
