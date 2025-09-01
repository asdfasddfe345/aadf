import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../../core/services/account.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { Account } from '../../../../core/models/account.models';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];
  loading = false;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private notify: NotificationService
  ) {}

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.loading = true;
    this.accountService.getAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
      },
      error: (error) => {
        this.notify.error('Failed to load accounts');
        console.error('Error loading accounts:', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  viewStatements(accountId: number) {
    this.router.navigate(['/accounts/statements', accountId]);
  }

  editAccount(account: Account) {
    // Navigate to edit account page or open dialog
    this.notify.info('Edit account functionality coming soon');
  }

  createAccount() {
    // Navigate to create account page or open dialog
    this.notify.info('Create account functionality coming soon');
  }
}