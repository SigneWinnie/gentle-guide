# Student Management System - Frontend (Angular)

## Quick Start

### Prerequisites
- Node.js 18+
- Angular CLI 17+
- npm or yarn

### Installation & Setup

1. **Create Angular Project**
```bash
ng new student-management-frontend --routing --style=css
cd student-management-frontend
```

2. **Add Angular Material**
```bash
ng add @angular/material
# Select Indigo/Pink theme
# Choose Yes for typography
# Choose Yes for animations
```

3. **Install Dependencies**
```bash
npm install @angular/cdk rxjs chart.js ng2-charts
```

4. **Generate Structure**
```bash
# Components
ng generate component components/layout/header
ng generate component components/layout/sidebar
ng generate component components/layout/footer
ng generate component pages/dashboard
ng generate component pages/students
ng generate component pages/courses
ng generate component pages/grades
ng generate component pages/registrations
ng generate component pages/rooms
ng generate component pages/schedules

# Services
ng generate service services/student
ng generate service services/course
ng generate service services/grade
ng generate service services/registration
ng generate service services/room
ng generate service services/schedule

# Models
# Create manually in src/app/models/
```

5. **Start Development Server**
```bash
ng serve --port 4200
```

Frontend runs on: **http://localhost:4200**

### Directory Structure
```
src/
├── app/
│   ├── models/                    # Data models/interfaces
│   │   ├── student.model.ts
│   │   ├── course.model.ts
│   │   ├── grade.model.ts
│   │   ├── registration.model.ts
│   │   ├── room.model.ts
│   │   └── schedule.model.ts
│   ├── services/                  # API services
│   │   ├── student.service.ts
│   │   ├── course.service.ts
│   │   ├── grade.service.ts
│   │   ├── registration.service.ts
│   │   ├── room.service.ts
│   │   └── schedule.service.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header/
│   │   │   ├── sidebar/
│   │   │   └── footer/
│   │   └── shared/
│   ├── pages/
│   │   ├── dashboard/
│   │   ├── students/
│   │   ├── courses/
│   │   ├── grades/
│   │   ├── registrations/
│   │   ├── rooms/
│   │   └── schedules/
│   ├── app.routes.ts              # Routing configuration
│   ├── app.config.ts              # App configuration
│   ├── app.component.ts
│   └── app.component.html
├── environments/
│   └── environment.ts
├── styles.css
└── index.html
```

### Key Features

- Dashboard with overview statistics
- Student management (CRUD operations)
- Course management
- Grade recording and tracking
- Student registrations
- Room management
- Schedule management
- Search and filter functionality
- Responsive Material Design UI
- RESTful API integration

### Environment Configuration

Update `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

### Build for Production

```bash
ng build --configuration production
```

### Testing

```bash
ng test
```

### Troubleshooting

**CORS Error**: Ensure backend is running on http://localhost:8080

**Module Not Found**: Run `npm install` to reinstall dependencies

**Port Already in Use**: Use `ng serve --port 4300`
