import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(payload: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/users/login',payload);
  }

  signup(payload:any): Observable<any> {
    return this.http.post('http://localhost:3000/api/users/users',payload);
  }

  forgotPassword(payload:any): Observable<any> {
    return this.http.post('http://localhost:3000/api/users/forgot-password',payload);
  }

  changePassword(payload:any): Observable<any> {
    return this.http.post('http://localhost:3000/api/users/change-password',payload);
  }
}
