import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-table',
  template: `
    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            @for (h of headers; track h) {
              <th>{{ h }}</th>
            }
          </tr>
        </thead>
        <tbody>
          <ng-content />
        </tbody>
      </table>
    </div>
  `,
  styles: `
    .table-wrap {
      width: 100%;
      overflow: auto;
      border-radius: 0.75rem;
      border: 1px solid hsl(var(--border));
      background: hsl(var(--card));
      box-shadow: var(--shadow-card);
    }
    .table {
      width: 100%;
      border-collapse: collapse;
      min-width: 900px;
    }
    th,
    td {
      padding: 10px 12px;
      border-bottom: 1px solid hsl(var(--border));
      color: hsl(var(--foreground));
      text-align: left;
      font-size: 13px;
      white-space: nowrap;
    }
    th {
      position: sticky;
      top: 0;
      z-index: 1;
      background: hsl(var(--muted) / 0.3);
      color: hsl(var(--muted-foreground));
      font-weight: 700;
    }
    tbody tr:hover td {
      background: hsl(var(--muted) / 0.2);
    }
  `,
})
export class DataTableComponent {
  @Input({ required: true }) headers: string[] = [];
}

