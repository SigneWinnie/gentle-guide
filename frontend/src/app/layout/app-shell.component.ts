import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

type NavItem = { label: string; path: string; icon: string };

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="layout">
      <!-- Sidebar -->
      <aside class="sidebar" [class.sidebar--open]="sidebarOpen()">
        <div class="sidebar__top">
          <div class="brand">
            <div class="brand__logo">ISJ</div>
            <div>
              <p class="brand__name">ISJ Student MS</p>
              <p class="brand__sub">Management System</p>
            </div>
          </div>
          <button class="icon-btn sidebar__close" type="button" (click)="sidebarOpen.set(false)">
            ✕
          </button>
        </div>

        <nav class="nav">
          @for (item of navItems; track item.path) {
            <a
              class="nav__item"
              [routerLink]="item.path"
              routerLinkActive="nav__item--active"
              [routerLinkActiveOptions]="{ exact: item.path === '' }"
              (click)="sidebarOpen.set(false)"
            >
              <span class="nav__icon" aria-hidden="true">{{ item.icon }}</span>
              <span>{{ item.label }}</span>
            </a>
          }
        </nav>
      </aside>

      <!-- Overlay -->
      @if (sidebarOpen()) {
        <div class="overlay" (click)="sidebarOpen.set(false)"></div>
      }

      <!-- Main content -->
      <div class="main">
        <header class="topbar">
          <button class="icon-btn topbar__menu" type="button" (click)="sidebarOpen.set(true)">
            ☰
          </button>
          <h1 class="topbar__title">Université Saint Jean — Student Management</h1>
        </header>
        <main class="content">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styles: `
    .layout {
      display: flex;
      height: 100dvh;
      overflow: hidden;
      background: hsl(var(--background));
      color: hsl(var(--foreground));
    }

    .sidebar {
      position: fixed;
      inset: 0 auto 0 0;
      z-index: 50;
      width: 16rem;
      background: hsl(var(--sidebar-background));
      color: hsl(var(--sidebar-foreground));
      border-right: 1px solid hsl(var(--sidebar-border));
      transform: translateX(-100%);
      transition: transform 200ms ease-in-out;
      display: flex;
      flex-direction: column;
    }
    .sidebar--open {
      transform: translateX(0);
    }

    .sidebar__top {
      height: 4rem;
      padding: 0 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      border-bottom: 1px solid hsl(var(--sidebar-border));
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      min-width: 0;
    }

    .brand__logo {
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 0.5rem;
      background: var(--gradient-primary);
      color: hsl(var(--primary-foreground));
      display: grid;
      place-items: center;
      font-weight: 800;
      font-size: 0.75rem;
      flex: 0 0 auto;
    }

    .brand__name {
      margin: 0;
      font-weight: 800;
      font-size: 0.875rem;
      line-height: 1.1;
      white-space: nowrap;
    }
    .brand__sub {
      margin: 0.125rem 0 0;
      font-size: 0.75rem;
      opacity: 0.6;
      white-space: nowrap;
    }

    .nav {
      padding: 0.75rem;
      display: grid;
      gap: 0.25rem;
    }

    .nav__item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.625rem 1rem;
      border-radius: 0.75rem;
      font-size: 0.875rem;
      font-weight: 600;
      text-decoration: none;
      color: hsl(var(--sidebar-foreground) / 0.7);
      transition: background-color 120ms ease, color 120ms ease;
    }
    .nav__item:hover {
      background: hsl(var(--sidebar-accent));
      color: hsl(var(--sidebar-accent-foreground));
    }
    .nav__item--active {
      background: hsl(var(--sidebar-primary));
      color: hsl(var(--sidebar-primary-foreground));
    }
    .nav__icon {
      width: 1rem;
      display: inline-flex;
      justify-content: center;
      opacity: 0.95;
    }

    .overlay {
      position: fixed;
      inset: 0;
      z-index: 40;
      background: hsl(var(--foreground) / 0.2);
    }

    .main {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      margin-left: 0;
    }

    .topbar {
      height: 4rem;
      border-bottom: 1px solid hsl(var(--border));
      display: flex;
      align-items: center;
      padding: 0 1.5rem;
      background: hsl(var(--card));
      flex: 0 0 auto;
      gap: 1rem;
    }

    .topbar__title {
      margin: 0;
      font-weight: 800;
      font-size: 1rem;
      color: hsl(var(--foreground));
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .content {
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem;
    }

    .icon-btn {
      border: 0;
      background: transparent;
      cursor: pointer;
      color: inherit;
      padding: 0.25rem 0.5rem;
      border-radius: 0.5rem;
      font-size: 1.125rem;
      line-height: 1;
    }
    .icon-btn:hover {
      background: hsl(var(--muted) / 0.5);
    }

    .sidebar__close {
      margin-left: auto;
      display: inline-flex;
    }

    .topbar__menu {
      display: inline-flex;
    }

    @media (min-width: 1024px) {
      .sidebar {
        position: relative;
        transform: translateX(0);
      }
      .overlay {
        display: none;
      }
      .sidebar__close {
        display: none;
      }
      .topbar__menu {
        display: none;
      }
      .main {
        margin-left: 0;
      }
    }
  `,
})
export class AppShellComponent {
  protected readonly sidebarOpen = signal(false);

  protected readonly navItems: NavItem[] = [
    { label: 'Dashboard', path: '', icon: '🏠' },
    { label: 'Students', path: 'students', icon: '🎓' },
    { label: 'Registrations', path: 'registrations', icon: '📋' },
    { label: 'Courses', path: 'courses', icon: '📚' },
    { label: 'Grades', path: 'grades', icon: '🧾' },
    { label: 'Rooms', path: 'rooms', icon: '🏢' },
    { label: 'Notifications', path: 'notifications', icon: '✉️' },
  ];
}

