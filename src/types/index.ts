export type TransactionType = 'income' | 'expense';

export type Category = 
  | 'Food' 
  | 'Shopping' 
  | 'Bills' 
  | 'Salary' 
  | 'Freelance' 
  | 'Entertainment' 
  | 'Travel' 
  | 'Healthcare' 
  | 'Investment' 
  | 'Education' 
  | 'Utilities' 
  | 'Other';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string; // ISO string
  type: TransactionType;
  category: Category;
}

export interface Totals {
  income: number;
  expense: number;
  balance: number;
}
