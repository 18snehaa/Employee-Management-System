import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { NavbarComponent } from '../layout/navbar';
import { EmployeeService } from '../services/employee.service';
import { EmployeeTableComponent } from '../employee-table/employee-table';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-template-driven',
  standalone: true,
  imports: [
    FormsModule,
    NavbarComponent,
    EmployeeTableComponent
  ],
  templateUrl: './template-driven.html'
})
export class TemplateDrivenComponent {

  employee: Omit<Employee, 'id'> = this.empty();

  refresh = 0;
  saving = false;

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
    private service: EmployeeService
  ) {}

  empty(): Omit<Employee, 'id'> {
    return {
      name: '',
      aadhar: '',
      pan: '',
      phone: '',
      email: '',
      salary: 1000,
      age: 18,
      department: '',
      gender: '',
      joiningDate: '',
      activeEmployee: true
    };
  }

  reset(): void {
    this.employee = this.empty();
  }

  submit(form: NgForm): void {

    if (form.invalid) {
      form.control.markAllAsTouched();
      alert('Please fill all fields correctly.');
      return;
    }

    this.saving = true;

    this.service.save(this.employee as Employee).subscribe({

      next: (savedEmployee: Employee) => {

        console.log('Saved employee:', savedEmployee);

        alert('Employee saved successfully!');

        form.resetForm();
        this.reset();

        this.refresh++;

        this.saving = false;
      },

      error: (error: HttpErrorResponse) => {

        console.error(error);

        alert(
          error?.error?.message ||
          'Save failed'
        );

        this.saving = false;
      }

    });
  }
}