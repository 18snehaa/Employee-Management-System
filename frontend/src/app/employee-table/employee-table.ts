import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../services/auth.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee-table.html',
  styleUrl: './employee-table.css'
})
export class EmployeeTableComponent implements OnChanges, OnInit {
  @Input() refresh = 0;
  employees: Employee[] = [];
  editingId: number | null = null;
  draft: Employee | null = null;
  page = 1;
  readonly pageSize = 5;
  loading = false;
  error = '';

  constructor(private service: EmployeeService, readonly auth: AuthService) {}

  ngOnInit(): void { this.load(); }
  ngOnChanges(changes: SimpleChanges): void { if (changes['refresh'] && !changes['refresh'].firstChange) this.load(); }
  load(): void {
    this.loading = true; this.error = '';
    this.service.getAll().subscribe({
      next: data => { this.employees = data; this.page = Math.min(this.page, this.pages); this.loading = false; },
      error: err => { console.error(err); this.error = 'Unable to load employees. Start Spring Boot and check MySQL.'; this.loading = false; }
    });
  }
  get pages(): number { return Math.max(1, Math.ceil(this.employees.length / this.pageSize)); }
  get rows(): Employee[] { const start = (this.page - 1) * this.pageSize; return this.employees.slice(start, start + this.pageSize); }
  previous(): void { if (this.page > 1) this.page--; }
  next(): void { if (this.page < this.pages) this.page++; }
  edit(e: Employee): void { this.editingId = e.id ?? null; this.draft = { ...e }; }
  cancel(): void { this.editingId = null; this.draft = null; }
  valid(e: Employee): boolean {
    return /^[A-Za-z ]+$/.test(e.name) && /^\d{12}$/.test(e.aadhar) && /^[A-Z]{5}\d{4}[A-Z]$/.test(e.pan) &&
      /^[6-9]\d{9}$/.test(e.phone) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email) && e.salary >= 0 &&
      e.age >= 18 && e.age <= 60 && !!e.department && !!e.gender && !!e.joiningDate;
  }
  update(): void {
    if (!this.draft || this.editingId === null) return;
    if (!this.valid(this.draft)) { alert('Please enter valid employee details.'); return; }
    if (!confirm('Are you sure you want to update this employee?')) return;
    this.service.update(this.editingId, this.draft).subscribe({
      next: () => { alert('Employee updated successfully!'); this.cancel(); this.load(); },
      error: err => { console.error(err); alert(err?.error?.message ?? 'Update failed'); }
    });
  }
  remove(id: number): void {
    if (!this.auth.isAdmin()) { alert('Only ADMIN can delete an employee.'); return; }
    if (!confirm('Are you sure you want to delete this employee?')) return;
    this.service.delete(id).subscribe({
      next: () => { alert('Employee deleted successfully!'); this.load(); },
      error: err => { console.error(err); alert(err?.error?.message ?? 'Delete failed'); }
    });
  }
}
