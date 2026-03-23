import { Component, inject, signal, computed } from '@angular/core';
import { StudentsApi } from '../../api/students.api';
import type { Student } from '../../api/api.types';
import { asErrorMessage, type LoadState } from '../../shared/ui';
import { DataTableComponent } from '../../shared/data-table.component';
import { NgIf, NgFor, NgClass } from '@angular/common';

type StudentForm = Omit<Student, 'id' | 'createdAt' | 'updatedAt' | 'active'> & {
  active?: boolean | null;
};

@Component({
  selector: 'app-students-page',
  standalone: true,
  imports: [DataTableComponent, NgIf, NgFor, NgClass],
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage {
  private readonly api = inject(StudentsApi);
  protected readonly state = signal<LoadState<Student[]>>({ status: 'loading' });

  protected readonly search = signal('');
  protected readonly showForm = signal(false);
  protected readonly editingId = signal<number | null>(null);
  protected readonly form = signal<StudentForm>({
    matricule: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'M',
    address: '',
    department: '',
    level: '',
    active: true,
  });

  protected readonly filtered = computed(() => {
    const term = this.search().toLowerCase();
    const data = this.state().data ?? [];
    if (!term) return data;
    return data.filter((s) =>
      `${s.matricule} ${s.firstName} ${s.lastName} ${s.department}`
        .toLowerCase()
        .includes(term),
    );
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
      matricule: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: 'M',
      address: '',
      department: '',
      level: '',
      active: true,
    });
    this.showForm.set(true);
  }

  protected openEdit(student: Student) {
    this.editingId.set(student.id);
    this.form.set({
      matricule: student.matricule,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email ?? '',
      phone: student.phone ?? '',
      dateOfBirth: student.dateOfBirth ?? '',
      gender: (student.gender as 'M' | 'F') ?? 'M',
      address: student.address ?? '',
      department: student.department ?? '',
      level: student.level ?? '',
      active: student.active ?? true,
    });
    this.showForm.set(true);
  }

  protected updateField<K extends keyof StudentForm>(key: K, value: StudentForm[K]) {
    this.form.update((current) => ({ ...current, [key]: value }));
  }

  protected submitForm(event: Event) {
    event.preventDefault();
    const id = this.editingId();
    const value = this.form();
    if (id) {
      this.api.update(id, value).subscribe({
        next: () => {
          this.showForm.set(false);
          this.reload();
        },
        error: (err) =>
          this.state.set({ status: 'error', message: asErrorMessage(err) }),
      });
    } else {
      this.api.create(value as StudentForm).subscribe({
        next: () => {
          this.showForm.set(false);
          this.reload();
        },
        error: (err) =>
          this.state.set({ status: 'error', message: asErrorMessage(err) }),
      });
    }
  }

  protected deleteStudent(id: number) {
    this.api.delete(id).subscribe({
      next: () => this.reload(),
      error: (err) =>
        this.state.set({ status: 'error', message: asErrorMessage(err) }),
    });
  }
}


