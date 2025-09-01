import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransferService } from '../../../../core/services/transfer.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { NewTransfer } from '../../../../core/models/transfer.models';

@Component({
  selector: 'app-transfer-review',
  templateUrl: './transfer-review.component.html',
  styleUrls: ['./transfer-review.component.scss']
})
export class TransferReviewComponent implements OnInit {
  transferData: NewTransfer | null = null;
  fromAccount: any = null;
  fees = 0; // Assuming no fees for now
  loading = false;

  constructor(
    private router: Router,
    private transferService: TransferService,
    private notify: NotificationService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state;
    
    if (state) {
      this.transferData = state['transferData'];
      this.fromAccount = state['fromAccount'];
    }
  }

  ngOnInit() {
    if (!this.transferData) {
      this.notify.error('No transfer data found. Please start over.');
      this.router.navigate(['/transfers']);
    }
  }

  goBack() {
    this.router.navigate(['/transfers']);
  }

  confirmTransfer() {
    if (!this.transferData) {
      return;
    }

    this.loading = true;
    
    this.transferService.createTransfer(this.transferData).subscribe({
      next: (receipt) => {
        this.notify.success('Transfer completed successfully!');
        this.router.navigate(['/transfers/status'], { 
          state: { receipt } 
        });
      },
      error: (error) => {
        this.notify.error('Transfer failed. Please try again.');
        console.error('Transfer error:', error);
        this.loading = false;
      }
    });
  }
}