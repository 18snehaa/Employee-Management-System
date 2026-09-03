CREATE DATABASE IF NOT EXISTS employees;
USE employees;

CREATE TABLE IF NOT EXISTS employee (
  id BIGINT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  aadhar VARCHAR(12) NOT NULL,
  pan VARCHAR(10) NOT NULL,
  phone VARCHAR(10) NOT NULL,
  email VARCHAR(150) NOT NULL,
  salary DOUBLE NOT NULL,
  age INT NOT NULL,
  department VARCHAR(100) NOT NULL,
  gender VARCHAR(20) NOT NULL,
  joining_date DATE NOT NULL,
  active_employee BOOLEAN NOT NULL DEFAULT TRUE,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users (
  id BIGINT NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL,
  PRIMARY KEY (id)
);

-- If your employee table already exists, keep your existing records.
-- Spring Boot uses ddl-auto=update and will add joining_date and active_employee.
