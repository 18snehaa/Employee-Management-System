import { Component } from '@angular/core';
import { NavbarComponent } from '../layout/navbar';
import { EmployeeTableComponent } from '../employee-table/employee-table';
@Component({selector:'app-employee-list',standalone:true,imports:[NavbarComponent,EmployeeTableComponent],templateUrl:'./employee-list.html'})
export class EmployeeListComponent {}
