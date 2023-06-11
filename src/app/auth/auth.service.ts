import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../shared/models/authResponse-model';
import { User } from '../shared/models/user-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  user!: User;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<AuthResponse> {
    const loginUrl = `${this.apiUrl}/login`;
    const loginData = { email, password };

    return this.http.post<AuthResponse>(loginUrl, loginData).pipe(
      tap((resp) => {
        localStorage.setItem('name', resp.user.name);
        localStorage.setItem('role', resp.user.role);
        localStorage.setItem('token', resp.token);
      })
    );
  }

  validarToken(): Observable<boolean> {
    const url = `${this.apiUrl}/auth/renovar`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.get<AuthResponse>(url, { headers }).pipe(
      tap((resp) => {
        if (resp.ok) {
          localStorage.setItem('token', resp.token!);
          this.user = resp.user;
        }
      }),
      map((resp) => resp.ok),
      catchError(() => of(false))
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
