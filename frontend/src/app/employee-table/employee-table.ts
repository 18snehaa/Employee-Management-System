import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';

import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../services/auth.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [],
  templateUrl: './employee-table.html',
  styleUrl: './employee-table.css'
})
export class EmployeeTableComponent
  implements OnInit, OnChanges {

  @Input() refresh = 0;

  employees: Employee[] = [];

  page = 1;

  readonly pageSize = 3;

  loading = false;

  error = '';

  constructor(
    private service: EmployeeService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['refresh'] &&
      !changes['refresh'].firstChange
    ) {
      this.load();
    }
  }

  load(): void {

    this.loading = true;
    this.error = '';

    this.service.getAll().subscribe({

      next: (data: Employee[]) => {

        this.employees = data;

        this.page = Math.min(
          this.page,
          this.pages
        );

        this.loading = false;
      },

      error: (err: HttpErrorResponse) => {

        console.error(err);

        this.error =
          'Unable to load employees.';

        this.loading = false;
      }
    });
  }

  get pages(): number {

    return Math.max(
      1,
      Math.ceil(
        this.employees.length /
        this.pageSize
      )
    );
  }

  get rows(): Employee[] {

    const start =
      (this.page - 1) *
      this.pageSize;

    return this.employees.slice(
      start,
      start + this.pageSize
    );
  }

  previous(): void {

    if (this.page > 1) {
      this.page--;
    }
  }

  next(): void {

    if (this.page < this.pages) {
      this.page++;
    }
  }

  edit(employee: Employee): void {

    if (!this.auth.isAdmin()) {

      alert(
        'Only ADMIN can edit an employee.'
      );

      return;
    }

    // Send selected employee to edit form
    window.dispatchEvent(
      new CustomEvent(
        'editEmployee',
        {
          detail: employee
        }
      )
    );
  }

  remove(id: number): void {

    if (!this.auth.isAdmin()) {

      alert(
        'Only ADMIN can delete an employee.'
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

    this.service.delete(id).subscribe({

      next: () => {

        alert(
          'Employee deleted successfully!'
        );

        this.load();
      },

      error: (err: HttpErrorResponse) => {

        console.error(err);

        alert(
          err?.error?.message ||
          'Delete failed'
        );
      }
    });
  }
}