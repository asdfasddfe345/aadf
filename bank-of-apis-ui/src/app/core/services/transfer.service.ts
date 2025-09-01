import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NewTransfer, TransferReceipt } from '../models/transfer.models';

@Injectable({ providedIn: 'root' })
export class TransferService {
  constructor(private http: HttpClient) {}

  createTransfer(transfer: NewTransfer): Observable<TransferReceipt> {
    return this.http.post<TransferReceipt>(`${environment.apiBase}/api/transfers`, transfer);
  }

  getTransfer(id: number): Observable<TransferReceipt> {
    return this.http.get<TransferReceipt>(`${environment.apiBase}/api/transfers/${id}`);
  }

  getAllTransfers(): Observable<TransferReceipt[]> {
    return this.http.get<TransferReceipt[]>(`${environment.apiBase}/api/transfers/all`);
  }

  getUserTransfers(): Observable<TransferReceipt[]> {
    return this.http.get<TransferReceipt[]>(`${environment.apiBase}/api/transfers`);
  }

  updateTransfer(id: number, transfer: Partial<TransferReceipt>): Observable<TransferReceipt> {
    return this.http.put<TransferReceipt>(`${environment.apiBase}/api/transfers/${id}`, transfer);
  }

  deleteTransfer(id: number): Observable<string> {
    return this.http.delete<string>(`${environment.apiBase}/api/transfers/${id}`);
  }

  getTransactionsByAccountId(accountId: number): Observable<TransferReceipt[]> {
    return this.http.get<TransferReceipt[]>(`${environment.apiBase}/api/transfers/account/${accountId}`);
  }
}