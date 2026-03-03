-- Student Management System Database Setup
-- Run this script in MySQL to setup the database and user

-- Drop existing database if needed (UNCOMMENT ONLY IF RESET NEEDED)
-- DROP DATABASE IF EXISTS student_management;

-- Create database
CREATE DATABASE IF NOT EXISTS student_management;

-- Create user if not exists
CREATE USER IF NOT EXISTS 'student_user'@'localhost' IDENTIFIED BY 'student_pass123';

-- Grant all privileges to user
GRANT ALL PRIVILEGES ON student_management.* TO 'student_user'@'localhost';

-- Reload privileges
FLUSH PRIVILEGES;

-- Verify setup
SELECT 'Database setup complete!' as Status;
SELECT User, Host FROM mysql.user WHERE User = 'student_user';
