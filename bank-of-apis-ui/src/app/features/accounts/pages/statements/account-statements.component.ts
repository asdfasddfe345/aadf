import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../../core/services/account.service';
import { TransferService } from '../../../../core/services/transfer.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { Account } from '../../../../core/models/account.models';
import { TransferReceipt } from '../../../../core/models/transfer.models';

@Component({
  selector: 'app-account-statements',
  templateUrl: './account-statements.component.html',
  styleUrls: ['./account-statements.component.scss']
})
export class AccountStatementsComponent implements OnInit {
  accounts: Account[] = [];
  transactions: TransferReceipt[] = [];
  selectedAccountId: number | null = null;
  fromDate: Date | null = null;
  toDate: Date | null = null;
  loading = false;
  
  displayedColumns: string[] = ['date', 'type', 'from', 'to', 'amount', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private transferService: TransferService,
    private notify: NotificationService
  ) {}

  ngOnInit() {
    this.loadAccounts();
    
    // Check if account ID is provided in route
    const accountId = this.route.snapshot.paramMap.get('id');
    if (accountId) {
      this.selectedAccountId = Number(accountId);
    }
  }

  loadAccounts() {
    this.accountService.getAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        if (this.selectedAccountId) {
          this.loadTransactions();
        }
      },
      error: (error) => {
        this.notify.error('Failed to load accounts');
        console.error('Error loading accounts:', error);
      }
    });
  }

  onAccountChange() {
    if (this.selectedAccountId) {
      this.loadTransactions();
    }
  }

  loadTransactions() {
    if (!this.selectedAccountId) {
      this.notify.error('Please select an account');
      return;
    }

    this.loading = true;
    this.transferService.getTransactionsByAccountId(this.selectedAccountId).subscribe({
      next: (transactions) => {
        this.transactions = transactions;
      },
      error: (error) => {
        this.notify.error('Failed to load transactions');
        console.error('Error loading transactions:', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  viewDetails(transaction: TransferReceipt) {
    this.notify.info(`Transaction ID: ${transaction.transactionId}`);
  }
}