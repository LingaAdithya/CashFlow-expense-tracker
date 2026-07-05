import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, CheckCircle2 } from 'lucide-react';

import { useTransactions } from '@/context/TransactionContext';
import { CATEGORIES } from '@/constants';
import type { Category, TransactionType } from '@/types';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const transactionSchema = z.object({
  title: z.string().min(1, 'Title is required').trim().max(50, 'Title is too long'),
  amount: z.number({ message: 'Amount is required' })
    .positive('Amount must be greater than zero')
    .max(999999999999, 'Amount is too large'),
  category: z.string().min(1, 'Category is required'),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

export const TransactionForm = () => {
  const { addTransaction } = useTransactions();
  const [type, setType] = useState<TransactionType>('expense');
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      title: '',
      amount: undefined,
      category: '',
    },
  });

  const onSubmit = (data: TransactionFormData) => {
    addTransaction({
      title: data.title,
      amount: data.amount,
      category: data.category as Category,
      type,
      date: new Date().toISOString(),
    });
    
    reset();
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 2000);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Add Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
          {/* Segmented Toggle */}
          <div className="relative flex p-1 bg-muted rounded-2xl">
            {['expense', 'income'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t as TransactionType)}
                className={`relative flex-1 py-2.5 text-sm font-semibold capitalize rounded-xl transition-colors ${
                  type === t ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {type === t && (
                  <motion.div
                    layoutId="type-indicator"
                    className="absolute inset-0 bg-background rounded-xl shadow-sm border border-border/50"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{t}</span>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">What was this for?</Label>
              <Input
                id="title"
                placeholder="e.g. Morning Coffee"
                {...register('title')}
                className={errors.title ? 'border-expense ring-expense' : ''}
              />
              <AnimatePresence>
                {errors.title && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-expense"
                  >
                    {errors.title.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register('amount', { valueAsNumber: true })}
                className={errors.amount ? 'border-expense ring-expense' : ''}
              />
              <AnimatePresence>
                {errors.amount && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-expense"
                  >
                    {errors.amount.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className={errors.category ? 'border-expense' : ''}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <SelectItem key={cat.label} value={cat.label}>
                            <div className="flex items-center gap-2">
                              <Icon size={16} color={cat.color} />
                              <span>{cat.label}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                )}
              />
              <AnimatePresence>
                {errors.category && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-expense"
                  >
                    {errors.category.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <Button type="submit" className="w-full relative overflow-hidden group">
            <span className={`transition-transform duration-300 ${isSuccess ? '-translate-y-12' : ''} flex items-center justify-center gap-2`}>
              <Plus size={18} />
              Add Transaction
            </span>
            <span className={`absolute inset-0 flex items-center justify-center gap-2 text-primary-foreground bg-income transition-transform duration-300 ${isSuccess ? 'translate-y-0' : 'translate-y-12'}`}>
              <CheckCircle2 size={18} />
              Success!
            </span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
