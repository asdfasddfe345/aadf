import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../../../core/services/account.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { Account } from '../../../../core/models/account.models';

@Component({
  selector: 'app-new-transfer',
  templateUrl: './new-transfer.component.html',
  styleUrls: ['./new-transfer.component.scss']
})
export class NewTransferComponent implements OnInit {
  transferForm: FormGroup;
  accounts: Account[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private notify: NotificationService
  ) {
    this.transferForm = this.fb.group({
      fromAccountId: [null, [Validators.required]],
      toAccountId: [null, [Validators.required]],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      transactiontype: ['TRANSFER', [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountService.getAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
      },
      error: (error) => {
        this.notify.error('Failed to load accounts');
        console.error('Error loading accounts:', error);
      }
    });
  }

  proceedToReview() {
    if (this.transferForm.invalid) {
      this.notify.error('Please fill in all required fields');
      return;
    }

    const transferData = this.transferForm.value;
    
    // Validate sufficient balance
    const fromAccount = this.accounts.find(acc => acc.accountId === transferData.fromAccountId);
    if (fromAccount && fromAccount.accountBalance < transferData.amount) {
      this.notify.error('Insufficient balance in source account');
      return;
    }

    this.router.navigate(['/transfers/review'], { 
      state: { transferData, fromAccount } 
    });
  }
}