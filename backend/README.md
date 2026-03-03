# Student Management System - Backend (Spring Boot)

## Quick Start

### Prerequisites
- Java 17+
- Maven 3.8+
- MySQL 8.0+

### Setup Instructions

1. **Create Database**
```bash
mysql -u root -p
CREATE DATABASE student_management;
CREATE USER 'student_user'@'localhost' IDENTIFIED BY 'student_pass123';
GRANT ALL PRIVILEGES ON student_management.* TO 'student_user'@'localhost';
FLUSH PRIVILEGES;
```

2. **Build and Run**
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs on: **http://localhost:8080/api**

### Directory Structure
```
backend/
├── src/main/java/com/isj/studentmanagement/
│   ├── StudentManagementApplication.java
│   ├── controller/          # REST endpoints
│   ├── service/             # Business logic
│   ├── repository/          # Data access
│   ├── model/               # Entity classes
│   ├── dto/                 # Data transfer objects
│   ├── exception/           # Custom exceptions
│   └── config/              # Configuration classes
├── src/main/resources/
│   └── application.properties
├── pom.xml
└── README.md
```

### API Endpoints

All endpoints use base URL: `http://localhost:8080/api`

#### Students
- `GET /students` - List all students
- `GET /students/{id}` - Get student by ID
- `POST /students` - Create student
- `PUT /students/{id}` - Update student
- `DELETE /students/{id}` - Delete student
- `GET /students/search?keyword=` - Search students

#### Courses
- `GET /courses` - List all courses
- `GET /courses/{id}` - Get course by ID
- `POST /courses` - Create course
- `PUT /courses/{id}` - Update course
- `DELETE /courses/{id}` - Delete course

#### Registrations
- `GET /registrations` - List all registrations
- `POST /registrations` - Register student
- `DELETE /registrations/{id}` - Cancel registration

#### Grades
- `GET /grades` - List all grades
- `POST /grades` - Record grade
- `PUT /grades/{id}` - Update grade
- `GET /grades/student/{studentId}` - Get student grades

#### Rooms
- `GET /rooms` - List all rooms
- `POST /rooms` - Create room
- `PUT /rooms/{id}` - Update room
- `DELETE /rooms/{id}` - Delete room

#### Schedules
- `GET /schedules` - List all schedules
- `POST /schedules` - Create schedule
- `PUT /schedules/{id}` - Update schedule
- `DELETE /schedules/{id}` - Delete schedule
