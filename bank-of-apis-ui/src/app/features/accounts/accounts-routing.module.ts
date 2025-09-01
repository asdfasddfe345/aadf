import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './pages/list/account-list.component';
import { AccountStatementsComponent } from './pages/statements/account-statements.component';

const routes: Routes = [
  { path: '', component: AccountListComponent },
  { path: 'statements', component: AccountStatementsComponent },
  { path: 'statements/:id', component: AccountStatementsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule {}