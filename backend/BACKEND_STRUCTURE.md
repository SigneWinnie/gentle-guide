# Backend Project Structure

Complete overview of the Spring Boot backend project structure and how all files work together.

---

## Project Layout

```
backend/
│
├── Configuration & Build Files
│   ├── pom.xml                          # Maven dependencies and build configuration
│   ├── application.properties           # Spring Boot configuration (DB, port, logging)
│   └── .gitignore                       # Git ignore rules
│
├── Documentation
│   ├── README.md                        # Quick start guide
│   ├── BACKEND_SETUP_GUIDE.md          # Complete setup with troubleshooting
│   ├── POSTMAN_TESTING_GUIDE.md        # All API endpoints with examples
│   ├── BACKEND_STRUCTURE.md            # This file
│   └── setup-database.sql              # SQL script to create database
│
└── src/main/java/com/isj/studentmanagement/
    │
    ├── StudentManagementApplication.java
    │   └── Main entry point, CORS configuration
    │
    ├── model/                          # Entity Classes (Database Entities)
    │   ├── Student.java                # Student entity with validations
    │   ├── Course.java                 # Course entity
    │   ├── Grade.java                  # Grade entity with calculations
    │   ├── Registration.java           # Registration entity (Many-to-Many)
    │   ├── Room.java                   # Room/Classroom entity
    │   └── Schedule.java               # Schedule entity
    │
    ├── repository/                     # Data Access Layer (JPA Repositories)
    │   ├── StudentRepository.java      # Student database queries
    │   ├── CourseRepository.java       # Course database queries
    │   ├── GradeRepository.java        # Grade database queries
    │   ├── RegistrationRepository.java # Registration database queries
    │   ├── RoomRepository.java         # Room database queries
    │   └── ScheduleRepository.java     # Schedule database queries
    │
    ├── service/                        # Business Logic Layer
    │   ├── StudentService.java         # Student business operations
    │   ├── CourseService.java          # Course business operations
    │   ├── GradeService.java           # Grade business operations
    │   ├── RegistrationService.java    # Registration business operations
    │   ├── RoomService.java            # Room business operations
    │   └── ScheduleService.java        # Schedule business operations
    │
    └── controller/                     # REST API Layer
        ├── StudentController.java      # Student REST endpoints (/students)
        ├── CourseController.java       # Course REST endpoints (/courses)
        ├── GradeController.java        # Grade REST endpoints (/grades)
        ├── RegistrationController.java # Registration REST endpoints (/registrations)
        ├── RoomController.java         # Room REST endpoints (/rooms)
        └── ScheduleController.java     # Schedule REST endpoints (/schedules)
```

---

## Architecture Layers

### 1. Controller Layer (REST API)

**Files:** `*Controller.java` in `controller/`

**Responsibility:** Handle HTTP requests and responses

**Example: StudentController**
```
GET    /api/students              → getAllStudents()
GET    /api/students/{id}         → getStudentById(id)
POST   /api/students              → createStudent(student)
PUT    /api/students/{id}         → updateStudent(id, student)
DELETE /api/students/{id}         → deleteStudent(id)
GET    /api/students/search       → searchStudents(keyword)
```

**What happens:**
1. Client sends HTTP request (e.g., GET /api/students)
2. Spring routes to appropriate method in Controller
3. Controller calls Service layer
4. Service returns data
5. Controller converts to JSON and returns HTTP response

---

### 2. Service Layer (Business Logic)

**Files:** `*Service.java` in `service/`

**Responsibility:** Implement business logic and validations

**Example: StudentService**
```java
public class StudentService {
    // Get all students from database
    public List<Student> getAllStudents()

    // Create student with validation
    public Student createStudent(Student student)

    // Update student
    public Student updateStudent(Long id, Student details)

    // Delete student
    public void deleteStudent(Long id)

    // Search students by name or matricule
    public List<Student> searchStudents(String keyword)
}
```

**What it does:**
1. Receives requests from Controller
2. Validates data (check if email exists, matricule unique, etc.)
3. Calls Repository to get/save data
4. Applies business logic
5. Returns result to Controller

---

### 3. Repository Layer (Data Access)

**Files:** `*Repository.java` in `repository/`

**Responsibility:** Database queries using JPA

**Example: StudentRepository**
```java
public interface StudentRepository extends JpaRepository<Student, Long> {
    // Custom database queries
    Optional<Student> findByMatricule(String matricule);
    Optional<Student> findByEmail(String email);
    List<Student> findByDepartment(String department);
    List<Student> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String firstName, String lastName);
}
```

**What it does:**
1. Defines database queries
2. Handles CRUD operations automatically (Create, Read, Update, Delete)
3. Custom query methods for specific searches
4. Returns database results to Service

---

### 4. Model Layer (Entity Classes)

**Files:** `*.java` in `model/`

**Responsibility:** Define database table structure and relationships

**Example: Student.java**
```java
@Entity                      // This is a database table
@Table(name = "students")    // Table name
public class Student {
    @Id                      // Primary key
    @GeneratedValue          // Auto increment
    private Long id;

    @Column(unique = true)   // Unique column
    private String matricule;

    @Email                   // Validation
    private String email;

    // More fields and validations
}
```

**What it represents:**
- Each class = One database table
- Each field = One database column
- Annotations define constraints and relationships

---

## Data Flow Example: Creating a Student

```
1. CLIENT (Postman)
   └─ POST /api/students with JSON body

2. SPRING ROUTER
   └─ Routes to StudentController.createStudent()

3. CONTROLLER (StudentController.java)
   ├─ Receives HTTP request
   ├─ Calls studentService.createStudent(student)
   └─ Returns HTTP response (201 Created)

4. SERVICE (StudentService.java)
   ├─ Validates data (checks email unique, matricule unique)
   ├─ Calls studentRepository.save(student)
   └─ Returns saved student

5. REPOSITORY (StudentRepository.java)
   ├─ Calls JPA to save to database
   ├─ Executes: INSERT INTO students (...)
   └─ Returns saved student with generated ID

6. DATABASE (MySQL)
   ├─ Creates auto_increment ID
   ├─ Inserts student record
   └─ Returns inserted row

7. Back through layers:
   Repository → Service → Controller → HTTP Response

8. CLIENT sees:
   HTTP 201 Created
   {
     "id": 1,
     "matricule": "STU001",
     "firstName": "John",
     ...
   }
```

---

## File-by-File Explanation

### Core Application File

**StudentManagementApplication.java**
- Application entry point
- Starts Spring Boot server
- Configures CORS for frontend access

---

### Model Files (Database Entities)

**Student.java**
- Represents student table
- Fields: id, matricule, firstName, lastName, email, phone, dateOfBirth, gender, address, department, level, active, createdAt, updatedAt
- Validations: @NotBlank, @Email, @Unique

**Course.java**
- Represents course table
- Fields: id, code, name, credits, department, semester, description, active, createdAt, updatedAt
- Validations: unique code, credits > 0, semester 1 or 2

**Grade.java**
- Represents grade table
- Fields: id, student, course, academicYear, ccScore, examScore, finalScore, gradeLetter, status
- Calculations: finalScore = (ccScore × 0.4) + (examScore × 0.6)
- Grade letter: A (16+), B+ (14+), B (12+), C (10+), D (8+), F (<8)

**Registration.java**
- Represents course registration (Many-to-Many between Student and Course)
- Fields: id, student, course, academicYear, registrationDate, status, completionDate
- Status: ACTIVE, COMPLETED, DROPPED, WITHDRAWN

**Room.java**
- Represents classroom
- Fields: id, roomNumber, building, capacity, roomType, facilities, active

**Schedule.java**
- Represents class schedule
- Fields: id, course, room, dayOfWeek, startTime, endTime, academicYear, active

---

### Repository Files (Database Queries)

Each Repository provides:
1. **Automatic CRUD operations** (inherited from JpaRepository)
   - `save()` - Insert/Update
   - `findAll()` - Get all records
   - `findById()` - Get by ID
   - `delete()` - Delete record

2. **Custom query methods** specific to entity
   - StudentRepository: findByMatricule(), findByEmail(), findByDepartment(), etc.
   - CourseRepository: findByCode(), findByDepartment(), findBySemester(), etc.
   - GradeRepository: findByStudent_Id(), findByCourse_Id(), etc.

---

### Service Files (Business Logic)

Each Service:
1. Receives requests from Controller
2. Validates data
3. Performs business logic
4. Calls Repository for database operations
5. Returns processed data

Example flow (StudentService):
```java
public Student createStudent(Student student) {
    // Validation
    if (studentRepository.existsByMatricule(student.getMatricule())) {
        throw new RuntimeException("Matricule already exists");
    }
    if (studentRepository.existsByEmail(student.getEmail())) {
        throw new RuntimeException("Email already exists");
    }

    // Save to database
    return studentRepository.save(student);
}
```

---

### Controller Files (REST Endpoints)

Each Controller:
1. Maps HTTP methods to Java methods
2. Receives JSON request bodies
3. Calls Service layer
4. Returns JSON responses with HTTP status codes

Example endpoints (StudentController):
```java
@GetMapping                  // GET /api/students
public List<Student> getAllStudents()

@PostMapping                 // POST /api/students
public Student createStudent(@RequestBody Student student)

@PutMapping("/{id}")         // PUT /api/students/1
public Student updateStudent(@PathVariable Long id, @RequestBody Student student)

@DeleteMapping("/{id}")      // DELETE /api/students/1
public void deleteStudent(@PathVariable Long id)
```

---

## Configuration Files

### pom.xml (Maven Configuration)
```xml
<dependencies>
  <!-- Spring Boot Web (REST API) -->
  <dependency>spring-boot-starter-web</dependency>

  <!-- Spring Data JPA (Database) -->
  <dependency>spring-boot-starter-data-jpa</dependency>

  <!-- MySQL Driver -->
  <dependency>mysql-connector-j</dependency>

  <!-- Validation -->
  <dependency>spring-boot-starter-validation</dependency>

  <!-- Lombok (reduces code) -->
  <dependency>lombok</dependency>
</dependencies>
```

### application.properties (Spring Configuration)
```properties
# Server
server.port=8080                    # Port application runs on
server.servlet.context-path=/api    # Base path for all endpoints

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/student_management
spring.datasource.username=student_user
spring.datasource.password=student_pass123

# Hibernate (auto-create tables)
spring.jpa.hibernate.ddl-auto=update

# Logging
logging.level.com.isj.studentmanagement=DEBUG
```

---

## Relationship Diagram

```
STUDENT (1)
   ├── (Many) REGISTRATION
   │            └── (Many) COURSE (1)
   │                         ├── (Many) SCHEDULE
   │                         │            └── (1) ROOM
   │                         └── (Many) GRADE
   │                                      └── (1) STUDENT

Database Relationships:
- Student has Many Registrations
- Registration has One Student and One Course
- Course has Many Registrations and Many Schedules
- Schedule belongs to One Course and One Room
- Student has Many Grades
- Grades belong to One Student and One Course
```

---

## How to Add New Endpoint

**Example: Add endpoint to get students by department**

**Step 1: Add to Repository** (StudentRepository.java)
```java
List<Student> findByDepartment(String department);
```

**Step 2: Add to Service** (StudentService.java)
```java
public List<Student> getStudentsByDepartment(String department) {
    return studentRepository.findByDepartment(department);
}
```

**Step 3: Add to Controller** (StudentController.java)
```java
@GetMapping("/department/{department}")
public ResponseEntity<List<Student>> getStudentsByDepartment(@PathVariable String department) {
    return ResponseEntity.ok(studentService.getStudentsByDepartment(department));
}
```

**Now the endpoint works:**
```
GET /api/students/department/Computer Science
```

---

## Testing the Backend

### Using Postman (Recommended)

See `POSTMAN_TESTING_GUIDE.md` for complete examples

### Using curl

```bash
# Get all students
curl http://localhost:8080/api/students

# Create student
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "matricule": "STU001",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "dateOfBirth": "2003-01-15",
    "gender": "M",
    "address": "123 Main St",
    "department": "Computer Science",
    "level": "Level 3"
  }'
```

---

## Dependency Injection

Spring automatically injects dependencies using `@RequiredArgsConstructor` from Lombok:

```java
@Service
@RequiredArgsConstructor
public class StudentService {
    // This is automatically injected by Spring
    private final StudentRepository studentRepository;
}
```

Is equivalent to:
```java
@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }
}
```

---

## HTTP Status Codes Used

```
200 OK                  - Request succeeded (GET, PUT)
201 Created            - Resource created successfully (POST)
204 No Content         - Successful delete (DELETE)
400 Bad Request        - Invalid data (validation error)
404 Not Found          - Resource doesn't exist
409 Conflict           - Duplicate entry (email, matricule, code)
500 Server Error       - Unexpected error
```

---

## Summary

| Layer | Purpose | Files | Technology |
|-------|---------|-------|-----------|
| Controller | Handle HTTP requests | `*Controller.java` | Spring Web |
| Service | Business logic | `*Service.java` | Java Logic |
| Repository | Database queries | `*Repository.java` | Spring Data JPA |
| Model | Database entities | `*.java` | JPA Entities |
| Configuration | Settings | `application.properties` | Spring Boot |
| Build | Dependencies | `pom.xml` | Maven |

---

## Running the Application

```bash
# 1. Build
mvn clean install

# 2. Run
mvn spring-boot:run

# 3. Test
curl http://localhost:8080/api/students
# Or use Postman

# 4. Stop
Ctrl+C
```

---

## Key Design Patterns

1. **Repository Pattern** - Abstraction for data access
2. **Service Layer** - Business logic separation
3. **Dependency Injection** - Loose coupling of components
4. **RESTful API** - Standard HTTP methods (GET, POST, PUT, DELETE)
5. **Entity Relationships** - @ManyToOne, @OneToMany mappings

---

This architecture ensures:
- Clean separation of concerns
- Easy to test each layer independently
- Easy to add new features
- Scalable and maintainable code
- Follows Spring Boot best practices
