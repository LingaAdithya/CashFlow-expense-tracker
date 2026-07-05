import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';

import { useTransactions } from '@/context/TransactionContext';
import { CATEGORIES } from '@/constants';
import { formatCurrency } from '@/utils/formatCurrency';
import { EmptyState } from './EmptyState';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const TransactionList = () => {
  const { transactions, deleteTransaction } = useTransactions();

  if (transactions.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto pr-2 pb-6 -mr-2">
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {transactions.map((transaction) => {
              const categoryDef = CATEGORIES.find((c) => c.label === transaction.category) || CATEGORIES[CATEGORIES.length - 1];
              const Icon = categoryDef.icon;
              
              return (
                <motion.div
                  key={transaction.id}
                  layout
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  className="group flex items-center justify-between p-4 rounded-[20px] bg-background border border-border/50 hover:shadow-soft transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: `${categoryDef.color}15`, color: categoryDef.color }}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{transaction.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(transaction.date), 'MMM d, yyyy')} • {transaction.category}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={`font-semibold ${transaction.type === 'income' ? 'text-income' : 'text-foreground'}`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </p>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mt-0.5">
                        {transaction.type}
                      </p>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTransaction(transaction.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-expense hover:bg-expense/10 rounded-xl w-8 h-8"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};
