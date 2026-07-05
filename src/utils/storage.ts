import type { Transaction } from '@/types';

const TRANSACTIONS_KEY = 'flow_transactions';

const MOCK_DATA: Transaction[] = [
  { id: crypto.randomUUID(), title: 'Salary', amount: 85000, date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), type: 'income', category: 'Salary' },
  { id: crypto.randomUUID(), title: 'Freelance Project', amount: 25000, date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), type: 'income', category: 'Freelance' },
  { id: crypto.randomUUID(), title: 'Groceries', amount: 3500, date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), type: 'expense', category: 'Food' },
  { id: crypto.randomUUID(), title: 'Internet Bill', amount: 999, date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), type: 'expense', category: 'Bills' },
  { id: crypto.randomUUID(), title: 'Coffee', amount: 250, date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), type: 'expense', category: 'Food' },
  { id: crypto.randomUUID(), title: 'New Shoes', amount: 4500, date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), type: 'expense', category: 'Shopping' },
  { id: crypto.randomUUID(), title: 'Weekend Trip', amount: 12000, date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), type: 'expense', category: 'Travel' },
  { id: crypto.randomUUID(), title: 'Netflix Subscription', amount: 649, date: new Date().toISOString(), type: 'expense', category: 'Entertainment' },
];

export const loadTransactions = (): Transaction[] => {
  try {
    const data = localStorage.getItem(TRANSACTIONS_KEY);
    if (data) {
      return JSON.parse(data);
    }
    // Seed mock data
    saveTransactions(MOCK_DATA);
    return MOCK_DATA;
  } catch (error) {
    console.error('Failed to load transactions:', error);
    return [];
  }
};

export const saveTransactions = (transactions: Transaction[]): void => {
  try {
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error('Failed to save transactions:', error);
  }
};
