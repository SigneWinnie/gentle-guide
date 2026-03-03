# Student Management System - Complete Setup from Git Clone

Quick guide to clone and run the entire backend project locally.

---

## TLDR (Quick Start)

```bash
# 1. Prerequisites: Java 17, Maven, MySQL
# 2. Create database
mysql -u root -p
# Paste SQL from: backend/BACKEND_SETUP_GUIDE.md Part 3

# 3. Clone and build
git clone <repo-url>
cd student-management/backend
mvn clean install

# 4. Run backend
mvn spring-boot:run

# 5. Test with Postman
# Base URL: http://localhost:8080/api

# See: backend/POSTMAN_TESTING_GUIDE.md for all endpoints
```

---

## Complete Step-by-Step Setup

### Step 1: Install Prerequisites (First Time Only)

Choose your operating system:

**Windows:**
1. Java 17: https://www.oracle.com/java/technologies/downloads/#java17
2. Maven: https://maven.apache.org/download.cgi
3. MySQL 8: https://dev.mysql.com/downloads/installer/
4. Git: https://git-scm.com/download/win
5. Postman: https://www.postman.com/downloads/

**macOS:**
```bash
brew install openjdk@17 maven mysql git
brew services start mysql
# Download Postman from https://www.postman.com/downloads/
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt install openjdk-17-jdk maven mysql-server git
sudo systemctl start mysql
# Download Postman from https://www.postman.com/downloads/
```

---

### Step 2: Setup MySQL Database

```bash
# Connect to MySQL
mysql -u root -p

# Enter root password when prompted
```

Paste these SQL commands:

```sql
CREATE DATABASE student_management;
CREATE USER 'student_user'@'localhost' IDENTIFIED BY 'student_pass123';
GRANT ALL PRIVILEGES ON student_management.* TO 'student_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Verify connection:
```bash
mysql -u student_user -p student_management
# Enter password: student_pass123
# If connected: EXIT
```

---

### Step 3: Clone Repository

```bash
# Navigate to desired location
cd ~/projects

# Clone repository
git clone <your-github-repo-url>

# Navigate to project
cd student-management/backend

# Verify files exist
ls -la
# Should see: pom.xml, application.properties, *.java files, README.md
```

---

### Step 4: Build Backend

```bash
# In backend directory
mvn clean install

# This downloads ~300MB of dependencies
# First time takes 2-3 minutes
# Look for: BUILD SUCCESS

# If error, check:
# - Internet connection
# - Maven installed: mvn -version
# - Java installed: java -version
```

---

### Step 5: Run Backend

**Terminal 1 - Start Backend:**

```bash
# Make sure you're in backend directory
cd backend

# Run backend
mvn spring-boot:run

# Expected output:
# Started StudentManagementApplication in 2.xxx seconds
# Tomcat started on port(s): 8080

# Keep this terminal open
```

**Verify Backend is Running:**

Open new terminal (Terminal 2):

```bash
# Test the API
curl http://localhost:8080/api/students

# Expected response: []  (empty array)

# Or open in browser:
# http://localhost:8080/api/students
```

---

### Step 6: Test with Postman

**Open Postman Application**

1. **Create new request:**
   - Click "+" to create new tab
   - Choose GET method
   - URL: `http://localhost:8080/api/students`
   - Click "Send"
   - Response: `[]`

2. **Create a Student:**
   - Click "+" for new tab
   - Choose POST method
   - URL: `http://localhost:8080/api/students`
   - Click "Body" tab
   - Choose "raw" and "JSON"
   - Paste:
   ```json
   {
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
   }
   ```
   - Click "Send"
   - Response: Student created with ID

3. **Get All Students:**
   - Create new GET request
   - URL: `http://localhost:8080/api/students`
   - Click "Send"
   - Response: Array with your created student

---

## Database Tables Auto-Created

When backend starts, these tables are automatically created:

```
student_management database tables:
├── students
├── courses
├── grades
├── registrations
├── rooms
└── schedules
```

View in MySQL:

```bash
mysql -u student_user -p student_management

# Then run:
SHOW TABLES;

# Output:
# +---------------------------+
# | Tables_in_student_management |
# +---------------------------+
# | courses                   |
# | grades                    |
# | registrations            |
# | rooms                     |
# | schedules                |
# | students                 |
# +---------------------------+

EXIT;
```

---

## Project Structure

```
student-management/
│
├── backend/                             # Backend Spring Boot application
│   ├── pom.xml                         # Maven dependencies
│   ├── application.properties          # Spring Boot config (DB connection)
│   ├── README.md                       # Quick start
│   ├── BACKEND_SETUP_GUIDE.md         # Complete setup guide
│   ├── POSTMAN_TESTING_GUIDE.md       # All API endpoints with examples
│   ├── .gitignore
│   │
│   └── src/main/java/com/isj/studentmanagement/
│       ├── StudentManagementApplication.java   # Entry point
│       ├── model/                              # Entity classes (Student, Course, etc)
│       ├── repository/                         # Data access (StudentRepository, etc)
│       ├── service/                            # Business logic (StudentService, etc)
│       └── controller/                         # REST APIs (StudentController, etc)
│
├── frontend/                            # Frontend Angular (in future branch)
│
├── GIT_CLONE_AND_RUN.md                # This file
├── COMPLETE_SETUP_GUIDE.md             # Full system setup (backend + frontend)
└── README.md                           # Project overview

```

---

## API Endpoints

All endpoints base URL: `http://localhost:8080/api`

### Students
- `GET /students` - Get all students
- `POST /students` - Create student
- `GET /students/{id}` - Get student by ID
- `PUT /students/{id}` - Update student
- `DELETE /students/{id}` - Delete student
- `GET /students/search?keyword=` - Search students

### Courses
- `GET /courses` - Get all courses
- `POST /courses` - Create course
- `GET /courses/{id}` - Get course by ID
- `PUT /courses/{id}` - Update course
- `DELETE /courses/{id}` - Delete course

### Grades
- `GET /grades` - Get all grades
- `POST /grades` - Record grade
- `GET /grades/student/{studentId}` - Get student grades
- `PUT /grades/{id}` - Update grade

### Registrations
- `GET /registrations` - Get all registrations
- `POST /registrations` - Register student for course
- `DELETE /registrations/{id}` - Cancel registration

### Rooms
- `GET /rooms` - Get all rooms
- `POST /rooms` - Create room
- `PUT /rooms/{id}` - Update room
- `DELETE /rooms/{id}` - Delete room

### Schedules
- `GET /schedules` - Get all schedules
- `POST /schedules` - Create schedule
- `PUT /schedules/{id}` - Update schedule
- `DELETE /schedules/{id}` - Delete schedule

**See `backend/POSTMAN_TESTING_GUIDE.md` for complete endpoint documentation with examples.**

---

## Troubleshooting

### Backend won't start - "Connection refused"
```
Error: org.springframework.boot.autoconfigure.jdbc.DataSourceProperties$DataSourceBeanCreationException

Solution:
1. Verify MySQL is running
2. Check credentials in backend/application.properties
3. Verify database was created: mysql -u student_user -p student_management
```

### Port 8080 already in use
```
Solution Windows:
netstat -ano | findstr :8080
taskkill /PID <PID> /F

Solution Mac/Linux:
lsof -i :8080
kill -9 <PID>

Alternative: Change port in application.properties
server.port=8081
```

### Maven build fails
```
Solution:
mvn clean install -DskipTests

If still fails:
rm -rf ~/.m2/repository
mvn clean install
```

### Can't connect to database
```
Solution:
mysql -u student_user -p student_management

If fails:
mysql -u root -p
# Re-run the SQL commands from Step 2 above
```

---

## Key Files

| File | Purpose |
|------|---------|
| `pom.xml` | Maven dependencies and build config |
| `application.properties` | Spring Boot configuration (database connection, port, etc) |
| `StudentManagementApplication.java` | Entry point - run this class |
| `*Repository.java` | Database queries |
| `*Service.java` | Business logic |
| `*Controller.java` | REST API endpoints |
| `*.java` (in model) | Database entities |

---

## Running Backend Again (After Initial Setup)

Once setup is complete:

```bash
# 1. Navigate to backend
cd student-management/backend

# 2. Start backend
mvn spring-boot:run

# 3. Test in Postman
# http://localhost:8080/api/students
```

No need to rebuild unless you pull new changes:

```bash
# If you pull new changes
git pull
mvn clean install
mvn spring-boot:run
```

---

## Database Connection Details

Saved in `backend/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_management?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=student_user
spring.datasource.password=student_pass123
```

Change if you use different credentials.

---

## Git Commands Reference

```bash
# Clone repository
git clone <repo-url>

# Check current branch
git branch

# Switch to backend branch
git checkout backend

# Pull latest changes
git pull

# See what changed
git status

# Check logs
git log --oneline
```

---

## Next Steps After Backend is Running

1. ✓ Backend is running on http://localhost:8080/api
2. ✓ Test all endpoints with Postman (see POSTMAN_TESTING_GUIDE.md)
3. ✓ Verify data in MySQL database
4. **Frontend Angular application** (in separate branch/future)

---

## Quick Reference

| Task | Command |
|------|---------|
| Build backend | `mvn clean install` |
| Run backend | `mvn spring-boot:run` |
| Stop backend | `Ctrl+C` (in terminal) |
| View MySQL | `mysql -u student_user -p student_management` |
| Test API | `curl http://localhost:8080/api/students` |
| Check Java | `java -version` |
| Check Maven | `mvn -version` |

---

## Support

If issues persist:
1. Read `backend/BACKEND_SETUP_GUIDE.md` (detailed setup with troubleshooting)
2. Check `backend/POSTMAN_TESTING_GUIDE.md` (API testing)
3. Review application logs (console output when running)
4. Verify all prerequisites are installed correctly

---

## Summary

```
1 min: Install prerequisites
5 min: Setup MySQL database
2 min: Clone repository
3 min: Build with Maven
1 min: Run backend
= Total: ~12 minutes to full working backend
```

Happy testing!
