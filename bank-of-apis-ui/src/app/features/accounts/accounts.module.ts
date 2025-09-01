import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material.module';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountListComponent } from './pages/list/account-list.component';
import { AccountStatementsComponent } from './pages/statements/account-statements.component';

@NgModule({
  declarations: [
    AccountListComponent,
    AccountStatementsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AccountsRoutingModule
  ]
})
export class AccountsModule {}