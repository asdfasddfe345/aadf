import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../../core/services/account.service';
import { TransferService } from '../../../../core/services/transfer.service';
import { Account } from '../../../../core/models/account.models';
import { TransferReceipt } from '../../../../core/models/transfer.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading = true;
  accounts: Account[] = [];
  totalBalance = 0;
  recentTransactions: TransferReceipt[] = [];

  constructor(
    private accountService: AccountService,
    private transferService: TransferService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    // Load accounts
    this.accountService.getAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        this.totalBalance = accounts.reduce((sum, account) => sum + (account.accountBalance || 0), 0);
      },
      error: (error) => {
        console.error('Error loading accounts:', error);
      }
    });

    // Load recent transactions
    this.transferService.getUserTransfers().subscribe({
      next: (transactions) => {
        this.recentTransactions = transactions.slice(0, 5); // Get last 5 transactions
      },
      error: (error) => {
        console.error('Error loading transactions:', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}