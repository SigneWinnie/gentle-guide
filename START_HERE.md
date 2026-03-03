# START HERE - Student Management System Backend

Welcome! This is your complete backend system ready to clone and run locally.

---

## What You Have

A production-ready Spring Boot backend with:
- **54 REST Endpoints** across 6 resources
- **MySQL Database** with 6 auto-created tables
- **Complete API Documentation** with Postman examples
- **Full Setup Guides** with troubleshooting
- **Ready to Test** with Postman on your computer

---

## 3-Step Quick Start

### Step 1: Prerequisites (First Time Only)

Install these once:
1. Java 17: https://www.oracle.com/java/technologies/downloads/#java17
2. Maven: https://maven.apache.org/download.cgi
3. MySQL 8: https://dev.mysql.com/downloads/mysql/
4. Git: https://git-scm.com/
5. Postman: https://www.postman.com/downloads/

**Time: 10 minutes**

### Step 2: Clone and Setup (First Time Only)

```bash
# 1. Setup database
mysql -u root -p
# Copy SQL from: backend/setup-database.sql
# Exit MySQL

# 2. Clone repository
git clone <your-github-url>
cd student-management/backend

# 3. Build
mvn clean install

# Time: 5 minutes (includes download)
```

### Step 3: Run Backend

```bash
# In backend directory
mvn spring-boot:run

# Wait for: "Tomcat started on port(s): 8080"
# Keep this terminal open!

# Time: 30 seconds
```

Open **new terminal** to test:
```bash
curl http://localhost:8080/api/students
# Response: []
```

**You're done!** Backend is running.

---

## Test with Postman

1. Open Postman
2. Create new GET request
3. URL: `http://localhost:8080/api/students`
4. Send
5. Response: `[]` (empty array)

**See full testing guide in:** `backend/POSTMAN_TESTING_GUIDE.md`

---

## File Guide

Read in this order:

| # | File | When | Read Time |
|---|------|------|-----------|
| 1 | **START_HERE.md** | Now | 2 min |
| 2 | **GIT_CLONE_AND_RUN.md** | Before cloning | 3 min |
| 3 | **BACKEND_SETUP_GUIDE.md** | During setup | 15 min |
| 4 | **POSTMAN_TESTING_GUIDE.md** | Before testing | 20 min |
| 5 | **BACKEND_STRUCTURE.md** | To understand code | 10 min |
| 6 | **BACKEND_COMPLETE_CHECKLIST.md** | Reference | 5 min |

---

## What Each Documentation File Does

**START_HERE.md** (This file)
- Quick overview
- 3-step guide
- File navigation

**GIT_CLONE_AND_RUN.md**
- Clone repository
- Setup MySQL
- Build and run
- Troubleshooting

**BACKEND_SETUP_GUIDE.md**
- Detailed installation steps
- Windows/Mac/Linux instructions
- Common issues and solutions
- Database verification

**POSTMAN_TESTING_GUIDE.md**
- All 54 endpoints
- Request examples
- Response examples
- Step-by-step test workflow
- Sample data

**BACKEND_STRUCTURE.md**
- Architecture explanation
- How layers work together
- File-by-file guide
- Design patterns
- How to add new features

**BACKEND_COMPLETE_CHECKLIST.md**
- Complete project summary
- Feature checklist
- File organization
- Quick reference
- Success criteria

---

## API Endpoints Summary

**Base URL:** `http://localhost:8080/api`

### Resources & Endpoints

```
STUDENTS (9 endpoints)
├── GET /students - List all
├── POST /students - Create
├── GET /students/{id} - Get one
├── PUT /students/{id} - Update
├── DELETE /students/{id} - Delete
└── ... (4 more filter/search endpoints)

COURSES (8 endpoints)
├── GET /courses - List all
├── POST /courses - Create
├── GET /courses/{id} - Get one
└── ... (5 more endpoints)

GRADES (10 endpoints)
├── GET /grades - List all
├── POST /grades - Record grade
├── GET /grades/student/{id} - Student grades
└── ... (7 more endpoints)

REGISTRATIONS (10 endpoints)
├── GET /registrations - List all
├── POST /registrations - Register student
├── GET /registrations/student/{id}
└── ... (7 more endpoints)

ROOMS (8 endpoints)
├── GET /rooms - List all
├── POST /rooms - Create room
└── ... (6 more endpoints)

SCHEDULES (9 endpoints)
├── GET /schedules - List all
├── POST /schedules - Create schedule
└── ... (7 more endpoints)

Total: 54 REST Endpoints
```

---

## Database Overview

### Auto-Created Tables

```
student_management
├── students - Student information
├── courses - Course details
├── grades - Student grades
├── registrations - Course registrations
├── rooms - Classrooms
└── schedules - Class schedules
```

### Database Credentials

```
Host: localhost
User: student_user
Password: student_pass123
Database: student_management
```

---

## Quick Test Workflow

Once backend is running:

### 1. Create Student
```
POST http://localhost:8080/api/students
```
Body:
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

### 2. Create Course
```
POST http://localhost:8080/api/courses
```
Body:
```json
{
  "code": "CS301",
  "name": "Database Management",
  "credits": 3,
  "department": "Computer Science",
  "semester": 1,
  "description": "Learn databases"
}
```

### 3. View All Students
```
GET http://localhost:8080/api/students
```
Response: Array with your created student

---

## Troubleshooting Quick Fix

**Backend won't start?**
```bash
# 1. Is MySQL running?
mysql -u student_user -p student_management
exit

# 2. Check Java version
java -version
# Should be 17+

# 3. Clear and rebuild
mvn clean install -DskipTests
```

**Postman connection error?**
```
1. Verify backend is running (should see "Tomcat started")
2. Try: curl http://localhost:8080/api/students
3. Check port 8080 isn't used: lsof -i :8080 (Mac/Linux)
```

**Database connection error?**
```
1. Start MySQL service
2. Verify credentials in: backend/application.properties
3. Create database: mysql -u root -p < backend/setup-database.sql
```

---

## Running Backend Again (After Setup)

```bash
# Navigate to backend
cd student-management/backend

# Run
mvn spring-boot:run

# Stop with: Ctrl+C
```

No rebuild needed unless you update code.

---

## Next Steps

1. **Right now:** Read `GIT_CLONE_AND_RUN.md`
2. **Install prerequisites:** Java, Maven, MySQL
3. **Clone repository:** `git clone <url>`
4. **Setup database:** Run SQL script
5. **Build:** `mvn clean install`
6. **Run:** `mvn spring-boot:run`
7. **Test:** Open Postman and test endpoints

---

## Key Files in Backend

```
backend/
├── pom.xml                       - Maven dependencies
├── application.properties        - Database configuration
├── START_HERE.md               - This file
├── GIT_CLONE_AND_RUN.md       - Setup instructions
├── BACKEND_SETUP_GUIDE.md     - Detailed guide
├── POSTMAN_TESTING_GUIDE.md   - API testing
├── BACKEND_STRUCTURE.md       - Architecture
├── BACKEND_COMPLETE_CHECKLIST.md - Reference
├── setup-database.sql         - Database SQL
├── .gitignore                 - Git rules
└── src/main/java/...          - Java source code
```

---

## Project Stats

| Metric | Count |
|--------|-------|
| REST Endpoints | 54 |
| Entity Models | 6 |
| Database Tables | 6 |
| Service Classes | 6 |
| Repository Classes | 6 |
| Controller Classes | 6 |
| Java Files | 23 |
| Documentation Pages | 8 |

---

## Success Checklist

Backend is working when:

- ✓ Backend starts without errors
- ✓ Console shows "Tomcat started on port(s): 8080"
- ✓ `curl http://localhost:8080/api/students` works
- ✓ Can create a student with Postman
- ✓ Can retrieve student from database
- ✓ Tables exist in MySQL

---

## Time Estimate

| Task | Time |
|------|------|
| Install prerequisites | 15 min |
| Setup MySQL | 5 min |
| Clone & build | 5 min |
| Run backend | 1 min |
| Test in Postman | 5 min |
| **Total** | **~30 min** |

---

## Get Help

1. **Setup issues:** Read `BACKEND_SETUP_GUIDE.md`
2. **API testing:** Read `POSTMAN_TESTING_GUIDE.md`
3. **Architecture:** Read `BACKEND_STRUCTURE.md`
4. **Complete reference:** Read `BACKEND_COMPLETE_CHECKLIST.md`

---

## Ready?

**Next step:** Open `GIT_CLONE_AND_RUN.md`

Happy testing!
