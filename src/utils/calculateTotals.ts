import type { Transaction, Totals } from '@/types';

export const calculateTotals = (transactions: Transaction[]): Totals => {
  return transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount;
        acc.balance += transaction.amount;
      } else {
        acc.expense += transaction.amount;
        acc.balance -= transaction.amount;
      }
      return acc;
    },
    { income: 0, expense: 0, balance: 0 }
  );
};
