import { ThemeProvider } from '@/context/ThemeContext';
import { TransactionProvider } from '@/context/TransactionContext';

import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/layout/Hero';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { TransactionForm } from '@/components/forms/TransactionForm';
import { TransactionList } from '@/components/dashboard/TransactionList';
import { ExpenseChart } from '@/components/dashboard/ExpenseChart';
import { InsightsCard } from '@/components/dashboard/InsightsCard';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="flow-theme">
      <TransactionProvider>
        <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 relative overflow-x-hidden">
          <Header />
          <main className="flex-1 flex flex-col w-full relative z-10">
            <Hero />
            
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 -mt-8 relative z-20 max-w-7xl">
              <SummaryCards />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6 flex flex-col min-h-[500px]">
                  <TransactionList />
                </div>
                
                <div className="space-y-6 flex flex-col">
                  <TransactionForm />
                  <ExpenseChart />
                  <InsightsCard />
                </div>
              </div>
            </section>
          </main>
        </div>
      </TransactionProvider>
    </ThemeProvider>
  );
}

export default App;
