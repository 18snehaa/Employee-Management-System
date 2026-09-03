import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({providedIn:'root'})
export class EmployeeService {
  private readonly url='http://localhost:8080/api/employees';
  constructor(private http:HttpClient){}
  getAll():Observable<Employee[]>{return this.http.get<Employee[]>(this.url);}
  save(employee:Employee):Observable<Employee>{return this.http.post<Employee>(this.url,employee);}
  update(id:number,employee:Employee):Observable<Employee>{return this.http.put<Employee>(`${this.url}/${id}`,employee);}
  delete(id:number):Observable<void>{return this.http.delete<void>(`${this.url}/${id}`);}
}
