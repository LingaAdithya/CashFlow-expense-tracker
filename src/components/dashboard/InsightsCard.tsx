import { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useTransactions } from '@/context/TransactionContext';
import { Lightbulb, TrendingDown, Target, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/utils/formatCurrency';
import { motion } from 'framer-motion';

export const InsightsCard = () => {
  const { transactions, totals } = useTransactions();

  const insights = useMemo(() => {
    if (transactions.length === 0) return [];
    
    const results = [];
    
    // Top Expense Category
    const expenses = transactions.filter(t => t.type === 'expense');
    if (expenses.length > 0) {
      const grouped = expenses.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
      }, {} as Record<string, number>);
      
      const topCategory = Object.entries(grouped).sort((a, b) => b[1] - a[1])[0];
      const percentage = ((topCategory[1] / totals.expense) * 100).toFixed(0);
      
      results.push({
        id: 1,
        title: `Your biggest expense is ${topCategory[0]}`,
        description: `Accounting for ${percentage}% of all your spending (${formatCurrency(topCategory[1])}).`,
        icon: Target,
        color: 'text-primary'
      });
    }

    // Savings Rate
    if (totals.income > 0) {
      const savingsRate = (((totals.income - totals.expense) / totals.income) * 100).toFixed(0);
      if (totals.income > totals.expense) {
        results.push({
          id: 2,
          title: 'You are saving more than you spend',
          description: `You have saved ${savingsRate}% of your income. Keep it up!`,
          icon: TrendingDown,
          color: 'text-income'
        });
      } else {
        results.push({
          id: 3,
          title: 'You are spending more than you earn',
          description: 'Consider reviewing your expenses to maintain a healthy balance.',
          icon: AlertCircle,
          color: 'text-expense'
        });
      }
    }

    return results;
  }, [transactions, totals]);

  if (insights.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb size={20} className="text-secondary" fill="currentColor" fillOpacity={0.2} />
          Smart Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, idx) => (
            <motion.div 
              key={insight.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="flex gap-4 items-start p-4 rounded-2xl bg-muted/50 border border-border/50"
            >
              <div className={`mt-1 bg-background p-2 rounded-xl shadow-sm ${insight.color}`}>
                <insight.icon size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-foreground">{insight.title}</h4>
                <p className="text-sm text-muted-foreground mt-0.5">{insight.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
