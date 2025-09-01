import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse, RegisterRequest, User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'boapi_token';
  private _isAuthed$ = new BehaviorSubject<boolean>(!!this.token);
  isAuthed$ = this._isAuthed$.asObservable();

  constructor(private http: HttpClient) {}

  get token(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  login(payload: LoginRequest): Observable<string> {
    return this.http.post<string>(`${environment.apiBase}/api/auth/login`, payload).pipe(
      tap(token => {
        sessionStorage.setItem(this.tokenKey, token);
        this._isAuthed$.next(true);
      })
    );
  }

  register(payload: RegisterRequest): Observable<User> {
    return this.http.post<User>(`${environment.apiBase}/api/auth/register`, payload);
  }

  logout() {
    sessionStorage.removeItem(this.tokenKey);
    this._isAuthed$.next(false);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBase}/api/auth/users`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiBase}/api/auth/users/${id}`);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${environment.apiBase}/api/auth/users/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBase}/api/auth/users/${id}`);
  }
}