import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { NavbarComponent } from '../layout/navbar';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../services/auth.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,

  imports: [
    FormsModule,
    NavbarComponent
  ],

  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeListComponent implements OnInit {

  employee: Omit<Employee, 'id'> = this.empty();

  employees: Employee[] = [];

  editingId: number | null = null;

  saving = false;
  loading = false;

  departments = [
    'IT',
    'HR',
    'Finance',
    'Sales',
    'Marketing',
    'Operations'
  ];

  genders = [
    'Male',
    'Female',
    'Other'
  ];

  constructor(
    private service: EmployeeService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  empty(): Omit<Employee, 'id'> {

    return {
      name: '',
      email: '',
      phone: '',
      age: 18,
      department: '',
      salary: 1000,
      aadhar: '',
      pan: '',
      gender: '',
      joiningDate: '',
      activeEmployee: true
    };
  }

  loadEmployees(): void {

    this.loading = true;

    this.service.getAll().subscribe({

      next: (data: Employee[]) => {

        this.employees = data;
        this.loading = false;
      },

      error: (error: HttpErrorResponse) => {

        console.error(error);

        alert('Unable to load employees.');

        this.loading = false;
      }
    });
  }

  submit(form: NgForm): void {

    if (form.invalid) {

      form.control.markAllAsTouched();

      alert('Please fill all fields correctly.');

      return;
    }

    if (this.editingId !== null) {

      this.updateEmployee();

    } else {

      this.addEmployee(form);
    }
  }

  addEmployee(form: NgForm): void {

    this.saving = true;

    this.service
      .save(this.employee as Employee)
      .subscribe({

        next: (savedEmployee: Employee) => {

          alert('Employee added successfully!');

          this.employees.push(savedEmployee);

          form.resetForm();

          this.employee = this.empty();

          this.saving = false;
        },

        error: (error: HttpErrorResponse) => {

          console.error(error);

          alert(
            error?.error?.message ||
            'Failed to add employee.'
          );

          this.saving = false;
        }
      });
  }

  editEmployee(employee: Employee): void {

    this.editingId = employee.id ?? null;

    this.employee = {

      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      age: employee.age,
      department: employee.department,
      salary: employee.salary,
      aadhar: employee.aadhar,
      pan: employee.pan,
      gender: employee.gender,
      joiningDate: employee.joiningDate,
      activeEmployee: employee.activeEmployee
    };

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  updateEmployee(): void {

    if (this.editingId === null) {
      return;
    }

    this.saving = true;

    const updatedEmployee: Employee = {

      id: this.editingId,

      ...this.employee
    };

    this.service
      .update(
        this.editingId,
        updatedEmployee
      )
      .subscribe({

        next: (employee: Employee) => {

          alert(
            'Employee updated successfully!'
          );

          const index =
            this.employees.findIndex(
              e => e.id === this.editingId
            );

          if (index !== -1) {

            this.employees[index] = employee;
          }

          this.cancelEdit();

          this.saving = false;
        },

        error: (error: HttpErrorResponse) => {

          console.error(error);

          alert(
            error?.error?.message ||
            'Failed to update employee.'
          );

          this.saving = false;
        }
      });
  }

  cancelEdit(form?: NgForm): void {

    this.editingId = null;

    this.employee = this.empty();

    if (form) {
      form.resetForm();
    }
  }

  deleteEmployee(id: number): void {

    // USER cannot delete
    if (!this.auth.isAdmin()) {

      alert(
        'Only ADMIN can delete employees.'
      );

      return;
    }

    if (
      !confirm(
        'Are you sure you want to delete this employee?'
      )
    ) {
      return;
    }

    this.service
      .delete(id)
      .subscribe({

        next: () => {

          alert(
            'Employee deleted successfully!'
          );

          this.employees =
            this.employees.filter(
              employee => employee.id !== id
            );

          if (this.editingId === id) {

            this.cancelEdit();
          }
        },

        error: (error: HttpErrorResponse) => {

          console.error(error);

          alert(
            error?.error?.message ||
            'Failed to delete employee.'
          );
        }
      });
  }

  clearForm(form: NgForm): void {

    this.editingId = null;

    form.resetForm();

    this.employee = this.empty();
  }
}