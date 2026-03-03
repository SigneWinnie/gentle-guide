# Postman Testing Guide - Student Management Backend

Complete guide to test the Spring Boot backend using Postman after cloning locally.

---

## Prerequisites

- Java 17 or higher installed
- Maven 3.8+ installed
- MySQL 8.0+ installed and running
- Postman installed
- Git installed

---

## Step 1: Clone Repository

```bash
# Clone the project
git clone <your-git-repo-url>
cd student-management-backend

# Navigate to backend directory
cd backend
```

---

## Step 2: Setup MySQL Database

### Option A: Command Line

```bash
# Open MySQL
mysql -u root -p

# Execute these commands:
CREATE DATABASE student_management;
CREATE USER 'student_user'@'localhost' IDENTIFIED BY 'student_pass123';
GRANT ALL PRIVILEGES ON student_management.* TO 'student_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Option B: MySQL Workbench
1. Open MySQL Workbench
2. Create new connection to localhost
3. Execute SQL script:
```sql
CREATE DATABASE student_management;
CREATE USER 'student_user'@'localhost' IDENTIFIED BY 'student_pass123';
GRANT ALL PRIVILEGES ON student_management.* TO 'student_user'@'localhost';
FLUSH PRIVILEGES;
```

### Verify Database Connection
```bash
mysql -u student_user -p student_management
# Enter password: student_pass123
# If connected successfully, type: exit
```

---

## Step 3: Build and Run Backend

### Build Project
```bash
# Navigate to backend directory
cd backend

# Build with Maven
mvn clean install

# This will download dependencies (first time may take 2-3 minutes)
```

### Run Backend
```bash
# Option 1: Using Maven plugin
mvn spring-boot:run

# Option 2: Run JAR file directly
java -jar target/student-management-backend-1.0.0.jar

# Option 3: Using IDE - Run StudentManagementApplication.java
```

**Expected Output:**
```
Started StudentManagementApplication in X.XXX seconds
Tomcat started on port(s): 8080
```

Backend is now running at: **http://localhost:8080/api**

---

## Step 4: Import Postman Collection

### Create Postman Collection

1. **Open Postman**
2. **Create new collection** named "Student Management API"
3. **Set Collection Variables:**
   - Click "Variables" tab
   - Add variable: `baseUrl` = `http://localhost:8080/api`

### Alternative: Import Pre-made Collection

See the Postman collection JSON file provided in the project.

---

## Step 5: API Endpoints Testing

All endpoints below assume base URL: `http://localhost:8080/api`

### STUDENTS ENDPOINTS

#### 1. Get All Students
```
GET /students
```
- No authentication required
- No body needed
- Returns: Array of all students

#### 2. Get Student by ID
```
GET /students/{id}
```
Example: `GET /students/1`
- Returns: Single student object

#### 3. Create Student
```
POST /students
Content-Type: application/json
```

**Body:**
```json
{
  "matricule": "STU001",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "dateOfBirth": "2003-01-15",
  "gender": "M",
  "address": "123 Main Street",
  "department": "Computer Science",
  "level": "Level 3"
}
```

**Validations:**
- matricule: Required, unique
- email: Required, valid email format, unique
- firstName, lastName, department, level: Required
- dateOfBirth: Valid date format (YYYY-MM-DD)
- gender: M or F

#### 4. Update Student
```
PUT /students/{id}
Content-Type: application/json
```

Example: `PUT /students/1`

**Body:** (Same as create, all fields required)
```json
{
  "matricule": "STU001",
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "phone": "+1234567890",
  "dateOfBirth": "2003-01-15",
  "gender": "F",
  "address": "456 Oak Avenue",
  "department": "Computer Science",
  "level": "Level 3",
  "active": true
}
```

#### 5. Delete Student
```
DELETE /students/{id}
```

Example: `DELETE /students/1`
- Returns: 204 No Content

#### 6. Search Students
```
GET /students/search?keyword=john
```
- Searches by firstName, lastName, or matricule
- Returns: Array of matching students

#### 7. Get Students by Department
```
GET /students/department/{department}
```

Example: `GET /students/department/Computer Science`

#### 8. Get Students by Level
```
GET /students/level/{level}
```

Example: `GET /students/level/Level 3`

#### 9. Get Active Students
```
GET /students/active/list
```

---

### COURSES ENDPOINTS

#### 1. Get All Courses
```
GET /courses
```

#### 2. Get Course by ID
```
GET /courses/{id}
```

#### 3. Create Course
```
POST /courses
Content-Type: application/json
```

**Body:**
```json
{
  "code": "CS301",
  "name": "Database Management",
  "credits": 3,
  "department": "Computer Science",
  "semester": 1,
  "description": "Learn database design and management",
  "active": true
}
```

**Validations:**
- code: Required, unique
- name: Required
- credits: Minimum 1
- department: Required
- semester: 1 or 2

#### 4. Update Course
```
PUT /courses/{id}
Content-Type: application/json
```

#### 5. Delete Course
```
DELETE /courses/{id}
```

#### 6. Get Courses by Department
```
GET /courses/department/Computer Science
```

#### 7. Get Courses by Semester
```
GET /courses/semester/1
```

#### 8. Get Active Courses
```
GET /courses/active/list
```

---

### GRADES ENDPOINTS

#### 1. Get All Grades
```
GET /grades
```

#### 2. Get Grade by ID
```
GET /grades/{id}
```

#### 3. Create Grade
```
POST /grades
Content-Type: application/json
```

**Body:**
```json
{
  "student": {
    "id": 1
  },
  "course": {
    "id": 1
  },
  "academicYear": "2023-2024",
  "ccScore": 15.5,
  "examScore": 17.0
}
```

**Validations:**
- ccScore: 0-20
- examScore: 0-20
- academicYear: Required
- Final score calculated automatically: (ccScore × 0.4) + (examScore × 0.6)

**Grade Letter:**
- A: >= 16
- B+: >= 14
- B: >= 12
- C: >= 10
- D: >= 8
- F: < 8

#### 4. Update Grade
```
PUT /grades/{id}
Content-Type: application/json
```

#### 5. Delete Grade
```
DELETE /grades/{id}
```

#### 6. Get Grades by Student
```
GET /grades/student/{studentId}
```

Example: `GET /grades/student/1`

#### 7. Get Grades by Course
```
GET /grades/course/{courseId}
```

#### 8. Get Grades by Academic Year
```
GET /grades/year/2023-2024
```

#### 9. Get Passed Grades
```
GET /grades/passed/list
```

#### 10. Get Failed Grades
```
GET /grades/failed/list
```

---

### REGISTRATIONS ENDPOINTS

#### 1. Get All Registrations
```
GET /registrations
```

#### 2. Get Registration by ID
```
GET /registrations/{id}
```

#### 3. Create Registration
```
POST /registrations
Content-Type: application/json
```

**Body:**
```json
{
  "student": {
    "id": 1
  },
  "course": {
    "id": 1
  },
  "academicYear": "2023-2024",
  "status": "ACTIVE"
}
```

**Status Options:**
- ACTIVE
- COMPLETED
- DROPPED
- WITHDRAWN

**Validations:**
- Unique constraint on (student_id, course_id, academic_year)

#### 4. Update Registration
```
PUT /registrations/{id}
Content-Type: application/json
```

#### 5. Delete Registration
```
DELETE /registrations/{id}
```

#### 6. Get Registrations by Student
```
GET /registrations/student/{studentId}
```

#### 7. Get Registrations by Course
```
GET /registrations/course/{courseId}
```

#### 8. Get Registrations by Academic Year
```
GET /registrations/year/2023-2024
```

#### 9. Get Active Registrations
```
GET /registrations/active/list
```

#### 10. Get Completed Registrations
```
GET /registrations/completed/list
```

---

### ROOMS ENDPOINTS

#### 1. Get All Rooms
```
GET /rooms
```

#### 2. Get Room by ID
```
GET /rooms/{id}
```

#### 3. Create Room
```
POST /rooms
Content-Type: application/json
```

**Body:**
```json
{
  "roomNumber": "A101",
  "building": "Building A",
  "capacity": 30,
  "roomType": "Lecture Hall",
  "facilities": "Projector, Whiteboard, AC",
  "active": true
}
```

**Validations:**
- roomNumber: Required, unique
- building: Required
- capacity: Minimum 1

#### 4. Update Room
```
PUT /rooms/{id}
```

#### 5. Delete Room
```
DELETE /rooms/{id}
```

#### 6. Get Rooms by Building
```
GET /rooms/building/Building A
```

#### 7. Get Rooms by Type
```
GET /rooms/type/Lecture Hall
```

#### 8. Get Active Rooms
```
GET /rooms/active/list
```

---

### SCHEDULES ENDPOINTS

#### 1. Get All Schedules
```
GET /schedules
```

#### 2. Get Schedule by ID
```
GET /schedules/{id}
```

#### 3. Create Schedule
```
POST /schedules
Content-Type: application/json
```

**Body:**
```json
{
  "course": {
    "id": 1
  },
  "room": {
    "id": 1
  },
  "dayOfWeek": "MONDAY",
  "startTime": "09:00:00",
  "endTime": "11:00:00",
  "academicYear": "2023-2024",
  "active": true
}
```

**Day Options:**
- MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY

#### 4. Update Schedule
```
PUT /schedules/{id}
```

#### 5. Delete Schedule
```
DELETE /schedules/{id}
```

#### 6. Get Schedules by Course
```
GET /schedules/course/{courseId}
```

#### 7. Get Schedules by Room
```
GET /schedules/room/{roomId}
```

#### 8. Get Schedules by Academic Year
```
GET /schedules/year/2023-2024
```

#### 9. Get Active Schedules
```
GET /schedules/active/list
```

---

## Postman Setup Instructions

### 1. Create Environment Variable
- Click "Environments" on left sidebar
- Click "+" to create new environment
- Name: "Local Dev"
- Add variable:
  - Key: `baseUrl`
  - Value: `http://localhost:8080/api`
- Save

### 2. Use Variable in Requests
In any request URL, use: `{{baseUrl}}/students`

### 3. Request Templates for Quick Testing

#### Quick Test Sequence
1. Create Student (GET ID from response)
2. Create Course (GET ID from response)
3. Create Grade (Use student ID and course ID)
4. Get Student by ID
5. Get Grades by Student
6. Update Student
7. Delete Registration
8. Delete Grade
9. Delete Course
10. Delete Student

---

## Expected HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 204 | No Content - Successful delete |
| 400 | Bad Request - Invalid data |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Duplicate entry/constraint violation |
| 500 | Internal Server Error |

---

## Sample Test Workflow

### Complete Flow

```
1. POST /students - Create student (saves ID: 1)
   Response: Student with id: 1

2. POST /courses - Create course (saves ID: 1)
   Response: Course with id: 1

3. POST /registrations - Register student for course
   Body: {student: {id:1}, course: {id:1}, academicYear: "2023-2024", status: "ACTIVE"}
   Response: Registration created

4. POST /grades - Record grade
   Body: {student: {id:1}, course: {id:1}, academicYear: "2023-2024", ccScore: 15, examScore: 17}
   Response: Grade with finalScore: 16.2, gradeLetter: "A"

5. GET /grades/student/1 - Verify student's grades
   Response: Array with the grade just created

6. GET /students/1 - Verify student exists
   Response: Student object

7. PUT /students/1 - Update student details
   Body: Updated student data
   Response: Updated student object

8. DELETE /registrations/{registrationId} - Cancel registration
   Response: 204 No Content

9. DELETE /grades/{gradeId} - Delete grade
   Response: 204 No Content

10. DELETE /students/1 - Delete student
    Response: 204 No Content
```

---

## Troubleshooting

### Backend Won't Start

**Error:** "Port 8080 already in use"
```
Solution 1: Kill process using port 8080
  Windows: netstat -ano | findstr :8080
  Mac/Linux: lsof -i :8080

Solution 2: Change port in application.properties
  server.port=8081
```

**Error:** "Connection refused to database"
```
Solution:
1. Verify MySQL is running
2. Check credentials in application.properties
3. Verify database exists: mysql -u student_user -p student_management
```

**Error:** "Table doesn't exist"
```
Solution:
- Restart backend - Hibernate will auto-create tables
- Check application.properties: spring.jpa.hibernate.ddl-auto=update
```

### Postman Issues

**CORS Error**
```
Solution: Backend CORS is already configured for all origins in StudentManagementApplication.java
```

**404 Not Found**
```
Solution: Verify:
1. Backend is running on http://localhost:8080
2. Endpoint path is correct (check swagger if available)
3. Resource ID exists
```

**400 Bad Request**
```
Solution:
1. Check JSON body format
2. Verify all required fields are included
3. Check data types (numbers, strings, dates)
4. Look at error message in response
```

---

## Database Tables (Auto-created)

The backend automatically creates these tables:

- `students` - Student information
- `courses` - Course details
- `grades` - Student grades
- `registrations` - Student course registrations
- `rooms` - Classroom information
- `schedules` - Class schedules

---

## Useful SQL Queries

```sql
-- Check if tables exist
SHOW TABLES IN student_management;

-- View all students
SELECT * FROM students;

-- View all courses
SELECT * FROM courses;

-- View specific student
SELECT * FROM students WHERE matricule = 'STU001';

-- Delete all data (if needed for fresh start)
DELETE FROM registrations;
DELETE FROM grades;
DELETE FROM schedules;
DELETE FROM students;
DELETE FROM courses;
DELETE FROM rooms;
```

---

## Next Steps

1. Clone repository
2. Setup MySQL database
3. Build backend with Maven
4. Run Spring Boot application
5. Open Postman
6. Test all endpoints following the workflow above
7. Check response data and status codes
8. Verify database entries in MySQL

Happy testing!
