import { Component, inject, signal } from '@angular/core';
import { RoomsApi } from '../../api/rooms.api';
import { SchedulesApi } from '../../api/schedules.api';
import { CoursesApi } from '../../api/courses.api';
import type { Room, Schedule, Course } from '../../api/api.types';
import { asErrorMessage, type LoadState } from '../../shared/ui';

type RoomForm = {
  roomNumber: string;
  building: string;
  capacity: number;
  roomType: string;
  facilities: string;
};

type ScheduleForm = {
  roomId: number | null;
  courseId: number | null;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  academicYear: string;
};

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

@Component({
  selector: 'app-rooms-page',
  standalone: true,
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage {
  private readonly roomsApi = inject(RoomsApi);
  private readonly schedulesApi = inject(SchedulesApi);
  private readonly coursesApi = inject(CoursesApi);

  protected readonly roomsState = signal<LoadState<Room[]>>({ status: 'loading' });
  protected readonly schedulesState = signal<LoadState<Schedule[]>>({ status: 'loading' });
  protected readonly courses = signal<Course[]>([]);

  protected readonly showRoomForm = signal(false);
  protected readonly showScheduleForm = signal(false);
  protected readonly editingRoomId = signal<number | null>(null);
  protected readonly roomForm = signal<RoomForm>({
    roomNumber: '',
    building: '',
    capacity: 30,
    roomType: 'CLASSROOM',
    facilities: '',
  });
  protected readonly scheduleForm = signal<ScheduleForm>({
    roomId: null,
    courseId: null,
    dayOfWeek: 'MONDAY',
    startTime: '08:00',
    endTime: '10:00',
    academicYear: '2024-2025',
  });

  protected readonly days = DAYS;

  constructor() {
    this.reloadRooms();
    this.reloadSchedules();
    this.coursesApi.list().subscribe({ next: (list) => this.courses.set(list) });
  }

  protected reloadRooms() {
    this.roomsState.set({ status: 'loading' });
    this.roomsApi.list().subscribe({
      next: (data) => this.roomsState.set({ status: 'success', data }),
      error: (err) =>
        this.roomsState.set({ status: 'error', message: asErrorMessage(err) }),
    });
  }

  protected reloadSchedules() {
    this.schedulesState.set({ status: 'loading' });
    this.schedulesApi.list().subscribe({
      next: (data) => this.schedulesState.set({ status: 'success', data }),
      error: (err) =>
        this.schedulesState.set({ status: 'error', message: asErrorMessage(err) }),
    });
  }

  protected getRoomName(s: Schedule): string {
    const r = s.room;
    if (!r) return '—';
    return r.roomNumber ?? '—';
  }

  protected getRoomBuilding(s: Schedule): string {
    const r = s.room;
    if (!r) return '';
    return r.building ?? '';
  }

  protected openRoomCreate() {
    this.editingRoomId.set(null);
    this.roomForm.set({
      roomNumber: '',
      building: '',
      capacity: 30,
      roomType: 'CLASSROOM',
      facilities: '',
    });
    this.showRoomForm.set(true);
  }

  protected openRoomEdit(r: Room) {
    this.editingRoomId.set(r.id);
    this.roomForm.set({
      roomNumber: r.roomNumber,
      building: r.building,
      capacity: r.capacity ?? 30,
      roomType: r.roomType ?? 'CLASSROOM',
      facilities: r.facilities ?? '',
    });
    this.showRoomForm.set(true);
  }

  protected closeRoomForm() {
    this.showRoomForm.set(false);
  }

  protected updateRoomField<K extends keyof RoomForm>(key: K, value: RoomForm[K]) {
    this.roomForm.update((f) => ({ ...f, [key]: value }));
  }

  protected submitRoom(e?: Event) {
    e?.preventDefault();
    const f = this.roomForm();
    const id = this.editingRoomId();
    const payload = {
      roomNumber: f.roomNumber,
      building: f.building,
      capacity: f.capacity,
      roomType: f.roomType || null,
      facilities: f.facilities || null,
    };
    if (id != null) {
      this.roomsApi.update(id, payload).subscribe({
        next: () => {
          this.closeRoomForm();
          this.reloadRooms();
          this.reloadSchedules();
        },
        error: (err) =>
          this.roomsState.set({ status: 'error', message: asErrorMessage(err) }),
      });
    } else {
      this.roomsApi.create(payload).subscribe({
        next: () => {
          this.closeRoomForm();
          this.reloadRooms();
        },
        error: (err) =>
          this.roomsState.set({ status: 'error', message: asErrorMessage(err) }),
      });
    }
  }

  protected deleteRoom(room: Room) {
    if (!confirm(`Delete room "${room.roomNumber}"?`)) return;
    this.roomsApi.delete(room.id).subscribe({
      next: () => {
        this.reloadRooms();
        this.reloadSchedules();
      },
      error: (err) =>
        this.roomsState.set({ status: 'error', message: asErrorMessage(err) }),
    });
  }

  protected openScheduleCreate() {
    this.scheduleForm.set({
      roomId: null,
      courseId: null,
      dayOfWeek: 'MONDAY',
      startTime: '08:00',
      endTime: '10:00',
      academicYear: '2024-2025',
    });
    this.showScheduleForm.set(true);
  }

  protected closeScheduleForm() {
    this.showScheduleForm.set(false);
  }

  protected updateScheduleField<K extends keyof ScheduleForm>(key: K, value: ScheduleForm[K]) {
    this.scheduleForm.update((f) => ({ ...f, [key]: value }));
  }

  protected submitSchedule(e?: Event) {
    e?.preventDefault();
    const f = this.scheduleForm();
    if (f.roomId == null || f.courseId == null) return;
    this.schedulesApi
      .create({
        room: { id: f.roomId },
        course: { id: f.courseId },
        dayOfWeek: f.dayOfWeek,
        startTime: f.startTime,
        endTime: f.endTime,
        academicYear: f.academicYear,
      })
      .subscribe({
        next: () => {
          this.closeScheduleForm();
          this.reloadSchedules();
        },
        error: (err) =>
          this.schedulesState.set({ status: 'error', message: asErrorMessage(err) }),
      });
  }

  protected deleteSchedule(s: Schedule) {
    if (!confirm('Delete this schedule?')) return;
    this.schedulesApi.delete(s.id).subscribe({
      next: () => this.reloadSchedules(),
      error: (err) =>
        this.schedulesState.set({ status: 'error', message: asErrorMessage(err) }),
    });
  }

  protected roomTypeClass(roomType: string | null | undefined): string {
    const t = (roomType ?? '').toUpperCase();
    if (t === 'CLASSROOM') return 'room-type room-type--primary';
    if (t === 'LAB') return 'room-type room-type--accent';
    if (t === 'AMPHITHEATER') return 'room-type room-type--secondary';
    return 'room-type';
  }

  protected hasFacility(facilities: string | null | undefined, key: string): boolean {
    if (!facilities) return false;
    return facilities.toUpperCase().includes(key.toUpperCase());
  }

  protected toggleFacility(key: string) {
    const label = key === 'ac' ? 'A/C' : 'Projector';
    this.roomForm.update((f) => {
      const current = (f.facilities ?? '').split(',').map((s) => s.trim()).filter(Boolean);
      const has = current.some((s) => s.toUpperCase() === label.toUpperCase());
      const next = has ? current.filter((s) => s.toUpperCase() !== label.toUpperCase()) : [...current, label];
      return { ...f, facilities: next.join(', ') };
    });
  }
}
