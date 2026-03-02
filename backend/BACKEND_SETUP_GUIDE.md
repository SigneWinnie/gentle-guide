# Complete Backend Setup Guide

Complete step-by-step guide to clone, setup, and run the Student Management Backend locally.

---

## Part 1: Prerequisites Installation

### Windows

#### 1. Install Java 17
- Download from: https://www.oracle.com/java/technologies/downloads/#java17
- Run installer and follow prompts
- Verify installation:
```bash
java -version
# Output should show: openjdk version "17.x.x" or higher
```

#### 2. Install Maven
- Download from: https://maven.apache.org/download.cgi
- Extract to: `C:\Program Files\Maven`
- Add to PATH:
  - Right-click "This PC" → Properties
  - Click "Advanced system settings"
  - Click "Environment Variables"
  - Under "System variables", click "New"
  - Variable name: `MAVEN_HOME`
  - Variable value: `C:\Program Files\Maven`
  - Add to PATH: `;C:\Program Files\Maven\bin`
- Verify:
```bash
mvn -version
```

#### 3. Install MySQL 8
- Download from: https://dev.mysql.com/downloads/installer/
- Choose "mysql-installer-community-8.0.x.msi"
- Run installer
- Default setup is fine
- Remember the root password you set
- Verify installation:
```bash
mysql --version
```

#### 4. Install Git
- Download from: https://git-scm.com/download/win
- Run installer with default settings
- Verify:
```bash
git --version
```

### macOS

```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Java 17
brew install openjdk@17
echo 'export PATH="/usr/local/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Install Maven
brew install maven

# Install MySQL
brew install mysql

# Start MySQL
brew services start mysql

# Install Git
brew install git

# Verify all installations
java -version
mvn -version
mysql --version
git --version
```

### Linux (Ubuntu/Debian)

```bash
# Update package manager
sudo apt update

# Install Java 17
sudo apt install openjdk-17-jdk

# Install Maven
sudo apt install maven

# Install MySQL
sudo apt install mysql-server

# Start MySQL
sudo systemctl start mysql

# Install Git
sudo apt install git

# Verify installations
java -version
mvn -version
mysql --version
git --version
```

---

## Part 2: Clone and Setup Project

### Step 1: Clone Repository

```bash
# Navigate to desired location
cd ~/projects/  # or your preferred directory

# Clone repository
git clone <your-github-repo-url>

# Navigate to project
cd student-management

# Navigate to backend
cd backend

# List files to verify
ls -la
```

Expected files and layout:
```
backend/
├── pom.xml                              # Maven configuration
├── application.properties               # Spring Boot config (in src/main/resources)
├── README.md
├── POSTMAN_TESTING_GUIDE.md
├── BACKEND_SETUP_GUIDE.md
├── BACKEND_STRUCTURE.md
├── setup-database.sql
└── src
    └── main
        ├── java
        │   └── com/isj/studentmanagement/
        │       ├── StudentManagementApplication.java
        │       ├── controller/          # REST controllers (StudentController.java, CourseController.java, ...)
        │       ├── service/             # Business logic (StudentService.java, ...)
        │       ├── repository/          # JPA repositories (StudentRepository.java, ...)
        │       └── model/               # Entity classes (Student.java, Course.java, Grade.java, Registration.java, Room.java, Schedule.java)
        └── resources/
            └── application.properties
```

---

## Part 3: Database Setup

### Step 1: Start MySQL

**Windows:**
```bash
# MySQL usually auto-starts, verify:
mysql -u root -p
# Enter your password
# If connected: exit
```

**macOS:**
```bash
# Already started if you used brew services
# Verify:
mysql -u root
exit
```

**Linux:**
```bash
# Start MySQL service
sudo systemctl start mysql

# Verify:
mysql -u root -p
# Enter password
# If connected: exit
```

### Step 2: Create Database and User

```bash
# Open MySQL command line
mysql -u root -p

# Enter root password when prompted
```

Then execute these SQL commands:

```sql
-- Create database
CREATE DATABASE student_management;

-- Create user
CREATE USER 'student_user'@'localhost' IDENTIFIED BY 'student_pass123';

-- Grant privileges
GRANT ALL PRIVILEGES ON student_management.* TO 'student_user'@'localhost';

-- Reload privileges
FLUSH PRIVILEGES;

-- Exit
EXIT;
```

### Step 3: Verify Database Connection

```bash
# Test the new user connection
mysql -u student_user -p student_management

# Enter password: student_pass123

# If successfully connected, run:
SHOW TABLES;

# Initially should be empty (tables will be auto-created by Hibernate)

# Exit
EXIT;
```

---

## Part 4: Build Backend

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Download Dependencies

```bash
# This downloads all dependencies from Maven Central Repository
# First time will take 2-3 minutes
mvn clean install

# Expected output:
# [INFO] BUILD SUCCESS
# [INFO] Total time: X.XXXs
```

If you get an error like "No internet connection", check:
1. Your internet connection is active
2. Firewall isn't blocking Maven
3. Try: `mvn clean install -DskipTests` to skip tests

---

## Part 5: Run Backend

### Option 1: Using Maven Plugin (Recommended)

```bash
mvn spring-boot:run

# Expected output:
# Started StudentManagementApplication in 2.xxx seconds
# Tomcat started on port(s): 8080
```

Backend is now running! Keep terminal open.

### Option 2: Run JAR File

```bash
# Build first
mvn clean package

# Then run
java -jar target/student-management-backend-1.0.0.jar

# Expected same output as Option 1
```

### Option 3: Run in IDE (IntelliJ IDEA or VS Code)

**IntelliJ IDEA:**
1. Open the project
2. Right-click `StudentManagementApplication.java`
3. Click "Run 'StudentManagementApplication'"

**VS Code with Spring Boot Extension:**
1. Install "Spring Boot Extension Pack"
2. Open command palette: Ctrl+Shift+P
3. Type "Spring Boot: Run"

---

## Part 6: Verify Backend is Running

Open a new terminal (keep previous one running):

```bash
# Test the backend
curl http://localhost:8080/api/students

# Expected response:
# []  (empty array initially)

# Or open in browser:
# http://localhost:8080/api/students
```

---

## Part 7: Database Auto-Creation

When backend starts for first time:
1. Hibernate automatically creates all tables
2. No manual table creation needed
3. Check in MySQL:

```bash
mysql -u student_user -p student_management

# Then run:
SHOW TABLES;

# You should see:
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

## Part 8: Test with Postman

### Open Postman and Test Endpoints

**Base URL:** `http://localhost:8080/api`

### Test 1: Get All Students

```
GET http://localhost:8080/api/students
```

Expected: `[]` (empty array)

### Test 2: Create a Student

```
POST http://localhost:8080/api/students
Content-Type: application/json

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

Expected: 201 Created with student data including ID

### Test 3: Create a Course

```
POST http://localhost:8080/api/courses
Content-Type: application/json

{
  "code": "CS301",
  "name": "Database Management",
  "credits": 3,
  "department": "Computer Science",
  "semester": 1,
  "description": "Database design and SQL"
}
```

Expected: 201 Created with course data

### Test 4: Create Registration

```
POST http://localhost:8080/api/registrations
Content-Type: application/json

{
  "student": {"id": 1},
  "course": {"id": 1},
  "academicYear": "2023-2024",
  "status": "ACTIVE"
}
```

Expected: 201 Created

### Test 5: Create Grade

```
POST http://localhost:8080/api/grades
Content-Type: application/json

{
  "student": {"id": 1},
  "course": {"id": 1},
  "academicYear": "2023-2024",
  "ccScore": 15,
  "examScore": 17
}
```

Expected: 201 Created with calculated finalScore and gradeLetter

---

## Common Issues and Solutions

### Issue 1: "Connection refused" to database

**Symptoms:**
```
org.springframework.boot.autoconfigure.jdbc.DataSourceProperties$DataSourceBeanCreationException:
Failed to determine a suitable driver class
```

**Solution:**
```bash
# Verify MySQL is running
mysql -u student_user -p student_management

# If fails, start MySQL:
# Windows: Net start MySQL80
# Mac: brew services start mysql
# Linux: sudo systemctl start mysql

# Check credentials in application.properties match what you set
```

### Issue 2: "Port 8080 already in use"

**Solution Windows:**
```bash
# Find process using port 8080
netstat -ano | findstr :8080

# Kill the process (replace PID)
taskkill /PID <PID> /F

# Or change port in application.properties:
server.port=8081
```

**Solution Mac/Linux:**
```bash
# Find process
lsof -i :8080

# Kill process
kill -9 <PID>
```

### Issue 3: Maven build fails

**Solution:**
```bash
# Clear cache and rebuild
mvn clean install -DskipTests

# If still fails:
rm -rf ~/.m2/repository
mvn clean install
```

### Issue 4: Tables not created

**Solution:**
```bash
# Restart backend - it will auto-create tables

# Or manually check status:
mvn spring-boot:run

# Look for Hibernate table creation logs
```

---

## Stopping Backend

**To stop the running backend:**

1. If running with `mvn spring-boot:run`:
   - Press `Ctrl+C` in the terminal

2. If running as JAR:
   - Press `Ctrl+C` in the terminal

3. Verify it stopped:
   ```bash
   curl http://localhost:8080/api/students
   # Should get connection refused
   ```

---

## Backend File Structure

```
backend/
│
├── pom.xml                              # Maven dependencies
├── application.properties               # Spring Boot configuration
├── README.md                           # Quick start guide
├── BACKEND_SETUP_GUIDE.md             # This file
├── POSTMAN_TESTING_GUIDE.md           # Detailed API testing
├── .gitignore                         # Git ignore rules
│
└── src/main/java/com/isj/studentmanagement/
    │
    ├── StudentManagementApplication.java    # Entry point
    │
    ├── model/                              # Entity classes
    │   ├── Student.java
    │   ├── Course.java
    │   ├── Grade.java
    │   ├── Registration.java
    │   ├── Room.java
    │   └── Schedule.java
    │
    ├── repository/                         # Data access layer
    │   ├── StudentRepository.java
    │   ├── CourseRepository.java
    │   ├── GradeRepository.java
    │   ├── RegistrationRepository.java
    │   ├── RoomRepository.java
    │   └── ScheduleRepository.java
    │
    ├── service/                            # Business logic
    │   ├── StudentService.java
    │   ├── CourseService.java
    │   ├── GradeService.java
    │   ├── RegistrationService.java
    │   ├── RoomService.java
    │   └── ScheduleService.java
    │
    └── controller/                         # REST endpoints
        ├── StudentController.java
        ├── CourseController.java
        ├── GradeController.java
        ├── RegistrationController.java
        ├── RoomController.java
        └── ScheduleController.java
```

---

## Summary: Quick Commands

```bash
# 1. Clone repository
git clone <repo-url>
cd student-management/backend

# 2. Build
mvn clean install

# 3. Run
mvn spring-boot:run

# 4. Test in separate terminal
curl http://localhost:8080/api/students

# 5. Database setup
mysql -u root -p
# Then run SQL commands from Part 3
```

---

## Next Steps

1. ✓ Clone repository
2. ✓ Install prerequisites
3. ✓ Setup MySQL database
4. ✓ Build backend with Maven
5. ✓ Run backend on port 8080
6. **→ Use Postman to test all endpoints** (see POSTMAN_TESTING_GUIDE.md)
7. **→ Verify database entries in MySQL** (see troubleshooting)

---

## Additional Resources

- Spring Boot Documentation: https://spring.io/projects/spring-boot
- Maven Documentation: https://maven.apache.org/
- MySQL Documentation: https://dev.mysql.com/doc/
- REST API Best Practices: https://restfulapi.net/

---

## Support

If you encounter issues:

1. Check the Troubleshooting section above
2. Review application logs (console output)
3. Verify MySQL connection: `mysql -u student_user -p student_management`
4. Check that all ports are correct (8080 for backend)
5. Ensure Java version is 17+: `java -version`

Good luck!
