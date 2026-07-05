import { createContext, useContext, useState, useEffect, type ReactNode, useMemo } from 'react';
import type { Transaction, Totals } from '@/types';
import { loadTransactions, saveTransactions } from '@/utils/storage';
import { calculateTotals } from '@/utils/calculateTotals';

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, updatedTransaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  totals: Totals;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTransactions(loadTransactions());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveTransactions(transactions);
    }
  }, [transactions, isLoaded]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const updateTransaction = (id: string, updatedTransaction: Omit<Transaction, 'id'>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...updatedTransaction, id } : t))
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const totals = useMemo(() => calculateTotals(transactions), [transactions]);

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, updateTransaction, deleteTransaction, totals }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};
