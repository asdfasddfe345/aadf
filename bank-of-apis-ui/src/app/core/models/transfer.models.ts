export interface NewTransfer {
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  transactiontype: string;
}

export interface TransferReceipt {
  transactionId: number;
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  transactiontype: string;
  date_transaction: string;
  userId: number;
}