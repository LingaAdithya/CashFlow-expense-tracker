import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';

export const EmptyState = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-12 text-center rounded-[24px] border border-dashed border-border/60 bg-muted/30"
    >
      <div className="w-20 h-20 bg-highlight/30 rounded-[32px] flex items-center justify-center mb-6 shadow-sm">
        <Wallet className="text-primary w-8 h-8" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold mb-2">Your financial journey starts here.</h3>
      <p className="text-muted-foreground max-w-sm mb-6">
        Add your first transaction to begin tracking your money and unlock insights.
      </p>
    </motion.div>
  );
};
