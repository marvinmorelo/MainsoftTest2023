import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    const loginUrl = `${this.apiUrl}/login`;
    const loginData = { email, password };

    return this.http.post<boolean>(loginUrl, loginData);
  }
}
