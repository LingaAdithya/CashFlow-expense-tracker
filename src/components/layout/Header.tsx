import { motion } from 'framer-motion';
import { Moon, Sun, WalletCards } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-40 w-full backdrop-blur-xl bg-background/80 border-b border-border/50 supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-soft">
            <WalletCards size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Flow</h1>
            <p className="text-xs text-muted-foreground font-medium hidden sm:block">
              {format(new Date(), 'EEEE, MMMM do')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold">Good Evening</p>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-2xl"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-accent-foreground" />
            ) : (
              <Moon className="h-5 w-5 text-foreground" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          <div className="w-10 h-10 rounded-2xl bg-secondary/20 border border-secondary/30 flex items-center justify-center shadow-sm overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </motion.header>
  );
};
