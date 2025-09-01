import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTransferComponent } from './pages/new-transfer/new-transfer.component';
import { TransferReviewComponent } from './pages/review/transfer-review.component';
import { TransferStatusComponent } from './pages/status/transfer-status.component';

const routes: Routes = [
  { path: '', component: NewTransferComponent },
  { path: 'review', component: TransferReviewComponent },
  { path: 'status', component: TransferStatusComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfersRoutingModule {}