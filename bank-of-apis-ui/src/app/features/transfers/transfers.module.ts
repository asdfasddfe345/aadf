import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material.module';
import { TransfersRoutingModule } from './transfers-routing.module';
import { NewTransferComponent } from './pages/new-transfer/new-transfer.component';
import { TransferReviewComponent } from './pages/review/transfer-review.component';
import { TransferStatusComponent } from './pages/status/transfer-status.component';

@NgModule({
  declarations: [
    NewTransferComponent,
    TransferReviewComponent,
    TransferStatusComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    TransfersRoutingModule
  ]
})
export class TransfersModule {}