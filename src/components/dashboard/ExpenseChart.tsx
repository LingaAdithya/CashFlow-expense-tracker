import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useTransactions } from '@/context/TransactionContext';
import { CATEGORIES } from '@/constants';
import { formatCurrency } from '@/utils/formatCurrency';

export const ExpenseChart = () => {
  const { transactions } = useTransactions();

  const data = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === 'expense');
    
    const grouped = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(grouped)
      .map(([name, value]) => {
        const categoryDef = CATEGORIES.find((c) => c.label === name);
        return {
          name,
          value,
          color: categoryDef?.color || '#9ca3af',
        };
      })
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  if (data.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Spending Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <p className="text-muted-foreground text-sm">No expenses to display</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Spending Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: any) => formatCurrency(Number(value))}
              contentStyle={{
                borderRadius: '16px',
                border: 'none',
                boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
                padding: '12px',
              }}
              itemStyle={{ color: '#2F2F33', fontWeight: 600 }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
