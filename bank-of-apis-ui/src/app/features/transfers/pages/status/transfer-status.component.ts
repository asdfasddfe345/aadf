import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransferReceipt } from '../../../../core/models/transfer.models';

@Component({
  selector: 'app-transfer-status',
  templateUrl: './transfer-status.component.html',
  styleUrls: ['./transfer-status.component.scss']
})
export class TransferStatusComponent implements OnInit {
  receipt: TransferReceipt | null = null;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state;
    
    if (state) {
      this.receipt = state['receipt'];
    }
  }

  ngOnInit() {
    if (!this.receipt) {
      console.warn('No receipt data found in navigation state');
    }
  }
}