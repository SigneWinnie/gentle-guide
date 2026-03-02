# Complete Installation & Setup Guide

---

## Step 1: Install Java 17+

### Windows

1. **Download Java 17**
   - Go to: https://www.oracle.com/java/technologies/downloads/#java17
   - Click **"Windows x64 Installer"** (it will be around 160 MB)
   - Save the file (e.g., `jdk-17_windows-x64_bin.exe`)

2. **Run the installer**
   - Double-click the `.exe` file
   - Click **"Next"** through the installation wizard
   - Note the installation path (usually: `C:\Program Files\Java\jdk-17.0.x`)
   - Click **"Install"** and wait for completion

3. **Verify installation**
   - Open PowerShell (Windows Terminal)
   - Run this command:
     ```powershell
     java -version
     ```
   - You should see something like:
     ```
     openjdk version "17.0.x" 2023-09-19
     ```

### macOS

```bash
# Using Homebrew (if you have it installed)
brew install openjdk@17

# If Homebrew not installed, get it from: https://brew.sh
```

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install openjdk-17-jdk
```

---

## Step 2: Install Maven 3.8+

### Windows

1. **Download Maven**
   - Go to: https://maven.apache.org/download.cgi
   - Under "Files", click the **link for the latest version** (e.g., `apache-maven-3.9.x-bin.zip`)
   - Save and extract the zip file to: `C:\Program Files\Maven`

2. **Set up environment variables**
   - Right-click **"This PC"** → **"Properties"**
   - Click **"Advanced system settings"** → **"Environment Variables"**
   - Under **"System variables"**, click **"New"**
     - Variable name: `MAVEN_HOME`
     - Variable value: `C:\Program Files\Maven` (adjust if different path)
   - Click **"OK"**
   - Now find the **"Path"** variable, click **"Edit"**
   - Click **"New"** and add: `C:\Program Files\Maven\bin`
   - Click **"OK"** on all windows

3. **Verify installation**
   - Close and reopen PowerShell
   - Run:
     ```powershell
     mvn -version
     ```
   - You should see Maven version info

### macOS

```bash
brew install maven
# Verify:
mvn -version
```

### Linux (Ubuntu/Debian)

```bash
sudo apt install maven
# Verify:
mvn -version
```

---

## Step 3: Install MySQL 8

### Windows

1. **Download MySQL**
   - Go to: https://dev.mysql.com/downloads/mysql/
   - Select version **8.0.x** (latest)
   - Choose **"Windows (x86, 64-bit), MSI Installer"**
   - Click **"Download"** (you may need to skip login)
   - Save the `.msi` file (~355 MB)

2. **Run the installer**
   - Double-click the `.msi` file
   - Click **"Next"** to start setup wizard
   - On **"Choosing Setup Type"**: select **"Developer Default"** → **"Next"**
   - Continue clicking **"Next"** through all screens
   - On **"MySQL Server Configuration"**:
     - Set **Port**: `3306` (default)
     - Click **"Next"**
   - On **"Server Configuration"**: use defaults, click **"Next"**
   - On **"Security"**: set **Root Password** (remember this!)
     - Example password: `root123` (or choose your own secure password)
     - Username stays as: `root`
     - Click **"Next"** → **"Finish"**
   - Wait for installation to complete

3. **Verify MySQL is running**
   - Open PowerShell
   - Run:
     ```powershell
     mysql -u root -p
     ```
   - When prompted, enter your root password
   - You should see:
     ```
     mysql>
     ```
   - Type: `exit` to quit

### macOS

```bash
brew install mysql

# Start MySQL service
brew services start mysql

# Verify
mysql -u root -p
# (no password required by default unless set)
```

### Linux (Ubuntu/Debian)

```bash
sudo apt install mysql-server

# Start MySQL service
sudo systemctl start mysql

# Verify
sudo mysql -u root -p
```

---

## Step 4: Create the Database

### Windows (PowerShell)

1. Open PowerShell
2. Connect to MySQL:
   ```powershell
   mysql -u root -p
   ```
3. Enter your root password when prompted
4. Run these commands in MySQL:
   ```sql
   CREATE DATABASE IF NOT EXISTS student_management;
   CREATE USER IF NOT EXISTS 'student_user'@'localhost' IDENTIFIED BY 'student_pass123';
   GRANT ALL PRIVILEGES ON student_management.* TO 'student_user'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

### OR Use the Setup Script (All Platforms)

1. From the backend folder, navigate to where `setup-database.sql` is located:
   ```bash
   cd backend
   ```

2. Run the script:
   **Windows:**
   ```powershell
   mysql -u root -p < setup-database.sql
   ```
   
   **macOS/Linux:**
   ```bash
   mysql -u root -p < setup-database.sql
   ```

3. Enter your root password when prompted

---

## Step 5: Update Application Database Credentials

The database is now created. Now tell your Spring Boot app how to connect.

1. Open this file in VS Code:
   ```
   backend/src/main/resources/application.properties
   ```

2. Update the credentials (if you used different values):
   
   **Current file:**
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/studentdb?useSSL=false&serverTimezone=UTC
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   ```

   **Change to (if you used the default setup):**
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/student_management?useSSL=false&serverTimezone=UTC
   spring.datasource.username=student_user
   spring.datasource.password=student_pass123
   ```

3. Save the file (Ctrl+S)

---

## Step 6: Build & Run the Backend

### Navigate to backend folder

Open PowerShell and go to the backend directory:
```powershell
cd "C:\Users\Winnie\Documents\YEAR FIVE NOTES\New folder\gentle-guide\backend"
```

### Build the project

```powershell
mvn clean install
```

This will:
- Download all dependencies
- Compile the code
- Run tests (if any)
- Package everything

**Wait 2-5 minutes for this to complete.** You'll see:
```
[INFO] BUILD SUCCESS
```

### Start the Spring Boot server

```powershell
mvn spring-boot:run
```

You should see output like:
```
...
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |\__,| / / / /
 =========|_|===========|_|___/=/_/_/_/
 :: Spring Boot ::               (v3.1.0)

2026-03-02 ... StudentManagementApplication : Started StudentManagementApplication in X.XXX seconds (JVM running for X.XXX)
```

The server is now **RUNNING** on: **`http://localhost:8080`**

---

## Step 7: Test the API with Postman

### Download Postman
- Go to: https://www.postman.com/downloads/
- Download the version for Windows
- Install it

### Test a simple endpoint

1. Open Postman
2. Click **"+"** to create a new request
3. Change from **"GET"** to **"GET"** (keep it as GET)
4. In the URL bar, enter:
   ```
   http://localhost:8080/students
   ```
5. Click **"Send"**
6. You should see a response:
   ```json
   []
   ```
   (empty list, no students yet)

### Other endpoints to test

**Create a Student (POST)**
- URL: `http://localhost:8080/students`
- Method: **POST**
- Body (click "Body" → "raw" → select "JSON"):
  ```json
  {
    "matricule": "STU001",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "department": "Computer Science",
    "level": "300"
  }
  ```
- Click **"Send"**

**Get All Courses**
- URL: `http://localhost:8080/courses`
- Method: **GET**
- Click **"Send"**

---

## Troubleshooting

### Maven not found after installation
- **Solution**: Close PowerShell completely and reopen it
- The PATH needs to be reloaded

### MySQL already running error
- **Solution**: Check what ports are in use:
  ```powershell
  netstat -ano | findstr :3306
  ```
- If MySQL is already running, that's fine, just leave it

### "Connection refused" error
- **Check**: Is MySQL running?
  ```powershell
  mysql -u root -p
  ```
- If not, start the MySQL service (see Step 3)

### Build fails with "Java version not supported"
- Verify Java version:
  ```powershell
  java -version
  ```
- Must be 17 or higher

### Port 8080 already in use
- Either stop the other application, or change the port in `application.properties`:
  ```properties
  server.port=8081
  ```
  Then access API at: `http://localhost:8081`

---

## Summary of URLs

| Tool | Download Link |
|------|--------------|
| **Java 17** | https://www.oracle.com/java/technologies/downloads/#java17 |
| **Maven** | https://maven.apache.org/download.cgi |
| **MySQL** | https://dev.mysql.com/downloads/mysql/ |
| **Postman** | https://www.postman.com/downloads/ |

---

## After Running Successfully

Once the backend is running at `http://localhost:8080`, you can:

1. **Test all microservices** in Postman (Students, Courses, Grades, Registrations, Rooms, Schedules)
2. **Check detailed endpoints** in the `POSTMAN_TESTING_GUIDE.md` file
3. **Modify data** and see the database update in real-time
4. **Run the frontend** (if you have one set up) and connect it to this API

---

**Good luck! 🚀**

