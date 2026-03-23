import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/app-shell.component').then((m) => m.AppShellComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.page').then(
            (m) => m.DashboardPage,
          ),
      },
      {
        path: 'students',
        loadComponent: () =>
          import('./pages/students/students.page').then((m) => m.StudentsPage),
      },
      {
        path: 'courses',
        loadComponent: () =>
          import('./pages/courses/courses.page').then((m) => m.CoursesPage),
      },
      {
        path: 'grades',
        loadComponent: () =>
          import('./pages/grades/grades.page').then((m) => m.GradesPage),
      },
      {
        path: 'registrations',
        loadComponent: () =>
          import('./pages/registrations/registrations.page').then(
            (m) => m.RegistrationsPage,
          ),
      },
      {
        path: 'rooms',
        loadComponent: () =>
          import('./pages/rooms/rooms.page').then((m) => m.RoomsPage),
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./pages/notifications/notifications.page').then(
            (m) => m.NotificationsPage,
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
