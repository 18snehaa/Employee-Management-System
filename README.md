# Employee Management System - Complete Assignment

## Technologies
- Angular 20 (standalone components)
- Angular Template-driven forms
- Angular Model-driven / Reactive forms
- Angular modern control flow: `@if`, `@else`, `@for`
- Spring Boot REST API
- Spring Security + JWT
- MySQL

## Pages
1. Login page
2. Home - Welcome to Employee Management System
3. Template Driven - full employee form + Submitted Employees table below
4. Model Driven - full employee form + same Submitted Employees table below
5. Employee List - same employee table/data

## Employee fields
Employee ID (auto-generated), Name, Email, Phone Number, Age, Department, Salary, Aadhar Card, PAN Card, Gender, Joining Date, Active Employee.

## Login credentials
ADMIN: username `admin`, password `admin123`, confirm password `admin123`
USER: username `user`, password `user123`, confirm password `user123`

## Database
Database: `employees`
Main table: `employee`
Login table: `users`

Run `backend/database.sql` in MySQL Workbench. If your `employee` table was already created, Spring Boot `ddl-auto=update` will add the new columns `joining_date` and `active_employee` without intentionally deleting existing rows.

Default MySQL settings are in `backend/src/main/resources/application.properties`. If your MySQL root password is not `root`, change that one property.

## Run backend
Open `backend` in Spring Tool Suite / Eclipse and run `EmployeeManagementSystemApplication.java`.

Backend: `http://localhost:8080`

## Run frontend
Open terminal in `frontend`:

`npm install`

`ng serve --port 4200`

Open `http://localhost:4200/login`.

## Data flow
Template Driven form -> EmployeeService -> JWT-authenticated Spring Boot API -> employee table in MySQL.

Model Driven form -> EmployeeService -> JWT-authenticated Spring Boot API -> same employee table in MySQL.

Employee List -> EmployeeService -> JWT-authenticated Spring Boot API -> same employee table in MySQL.

Therefore a record saved from either form appears in both Submitted Employees tables and Employee List.
