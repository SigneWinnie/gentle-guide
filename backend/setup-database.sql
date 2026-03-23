-- Student Management Microservices Database Setup
-- Run this script in MySQL to setup the databases and user

-- Create databases for each service
CREATE DATABASE IF NOT EXISTS studentdb;
CREATE DATABASE IF NOT EXISTS coursedb;
CREATE DATABASE IF NOT EXISTS roomdb;
CREATE DATABASE IF NOT EXISTS registrationdb;
CREATE DATABASE IF NOT EXISTS gradedb;
CREATE DATABASE IF NOT EXISTS scheduledb;
CREATE DATABASE IF NOT EXISTS notificationdb;

-- Create user if not exists
CREATE USER IF NOT EXISTS 'student_user'@'localhost' IDENTIFIED BY 'student_pass123';

-- Grant all privileges to user on all databases
GRANT ALL PRIVILEGES ON studentdb.* TO 'student_user'@'localhost';
GRANT ALL PRIVILEGES ON coursedb.* TO 'student_user'@'localhost';
GRANT ALL PRIVILEGES ON roomdb.* TO 'student_user'@'localhost';
GRANT ALL PRIVILEGES ON registrationdb.* TO 'student_user'@'localhost';
GRANT ALL PRIVILEGES ON gradedb.* TO 'student_user'@'localhost';
GRANT ALL PRIVILEGES ON scheduledb.* TO 'student_user'@'localhost';
GRANT ALL PRIVILEGES ON notificationdb.* TO 'student_user'@'localhost';

-- Reload privileges
FLUSH PRIVILEGES;

-- Verify setup
SELECT 'Databases setup complete!' as Status;
SHOW DATABASES LIKE 'studentdb';
