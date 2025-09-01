import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Account } from '../models/account.models';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private http: HttpClient) {}

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${environment.apiBase}/api/accounts`);
  }

  getAccount(id: number): Observable<Account> {
    return this.http.get<Account>(`${environment.apiBase}/api/accounts/${id}`);
  }

  createAccount(account: Partial<Account>): Observable<Account> {
    return this.http.post<Account>(`${environment.apiBase}/api/accounts`, account);
  }

  updateAccount(id: number, account: Partial<Account>): Observable<Account> {
    return this.http.put<Account>(`${environment.apiBase}/api/accounts/${id}`, account);
  }

  deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBase}/api/accounts/${id}`);
  }
}