export interface Account {
  accountId: number;
  accountType: string;
  accountBalance: number;
  userId: number;
}

export interface StatementFilter {
  accountId: number;
  from?: string;
  to?: string;
  type?: 'CREDIT' | 'DEBIT';
}

export interface TransactionRow {
  transactionId: number;
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  transactiontype: string;
  date_transaction: string;
  userId: number;
}