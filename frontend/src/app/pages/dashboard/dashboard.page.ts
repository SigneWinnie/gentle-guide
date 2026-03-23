import { Component, inject, signal, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { StudentsApi } from '../../api/students.api';
import { CoursesApi } from '../../api/courses.api';
import { GradesApi } from '../../api/grades.api';
import { RegistrationsApi } from '../../api/registrations.api';
import { RoomsApi } from '../../api/rooms.api';
import type { Student, Registration } from '../../api/api.types';
import { asErrorMessage, type LoadState } from '../../shared/ui';

type DashboardData = {
  students: Student[];
  courses: { length: number };
  grades: { length: number };
  registrations: Registration[];
  rooms: { length: number };
};

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  private readonly studentsApi = inject(StudentsApi);
  private readonly coursesApi = inject(CoursesApi);
  private readonly gradesApi = inject(GradesApi);
  private readonly registrationsApi = inject(RegistrationsApi);
  private readonly roomsApi = inject(RoomsApi);

  protected readonly state = signal<LoadState<DashboardData>>({ status: 'loading' });

  protected readonly summary = computed(() => {
    const data = this.state().data;
    if (!data) return null;
    const regs = data.registrations;
    return {
      confirmedRegs: regs.filter((r) => r.status === 'COMPLETED').length,
      pendingRegs: regs.filter((r) => r.status === 'ACTIVE').length,
      cancelledRegs: regs.filter((r) => r.status === 'CANCELLED').length,
      totalFees: 0,
      totalPaid: 0,
      recentStudents: data.students.slice(0, 5),
    };
  });

  constructor() {
    this.load();
  }

  protected load() {
    this.state.set({ status: 'loading' });
    forkJoin({
      students: this.studentsApi.list(),
      courses: this.coursesApi.list(),
      grades: this.gradesApi.list(),
      registrations: this.registrationsApi.list(),
      rooms: this.roomsApi.list(),
    }).subscribe({
      next: (data) =>
        this.state.set({
          status: 'success',
          data: {
            students: data.students,
            courses: data.courses,
            grades: data.grades,
            registrations: data.registrations,
            rooms: data.rooms,
          },
        }),
      error: (err) =>
        this.state.set({ status: 'error', message: asErrorMessage(err) }),
    });
  }
}
