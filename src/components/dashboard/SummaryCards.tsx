import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Wallet } from 'lucide-react';
import { useTransactions } from '@/context/TransactionContext';
import { formatCurrency } from '@/utils/formatCurrency';

const AnimatedCounter = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = formatCurrency(latest);
      }
    });
  }, [springValue]);

  return <span ref={ref}>{formatCurrency(0)}</span>;
};

export const SummaryCards = () => {
  const { totals } = useTransactions();

  const cards = [
    {
      title: 'Total Balance',
      amount: totals.balance,
      icon: Wallet,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary/20',
      trend: '+2.5%',
    },
    {
      title: 'Total Income',
      amount: totals.income,
      icon: ArrowUpRight,
      color: 'text-income',
      bgColor: 'bg-income/10',
      borderColor: 'border-income/20',
      trend: '+12%',
    },
    {
      title: 'Total Expenses',
      amount: totals.expense,
      icon: ArrowDownRight,
      color: 'text-expense',
      bgColor: 'bg-expense/10',
      borderColor: 'border-expense/20',
      trend: '-4.1%',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-20 transition-transform duration-500 group-hover:scale-150 ${card.bgColor}`} />
            
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${card.bgColor} ${card.color} ${card.borderColor} border`}>
                  <card.icon size={24} strokeWidth={2.5} />
                </div>
                <div className="text-sm font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                  {card.trend}
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">{card.title}</h3>
                <div className="text-3xl font-bold tracking-tight text-foreground">
                  <AnimatedCounter value={card.amount} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
