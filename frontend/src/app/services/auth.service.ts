import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../models/login-response';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly url = 'http://localhost:8080/auth';
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/login`, { username, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('role', response.role);
      })
    );
  }

  isLoggedIn(): boolean { return !!localStorage.getItem('token'); }
  logout(): void { localStorage.clear(); }
  get username(): string { return localStorage.getItem('username') ?? ''; }
  get role(): string { return localStorage.getItem('role') ?? ''; }
  isAdmin(): boolean { return this.role === 'ADMIN'; }
}
