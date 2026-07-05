import React from 'react';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Abstract decorative elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob dark:mix-blend-lighten" />
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 dark:mix-blend-lighten" />
      <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-highlight/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 dark:mix-blend-lighten" />
      
      <div className="relative z-10 max-w-2xl text-center mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
        >
          Your Money.<br/>
          <span className="text-primary">Your Story.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-muted-foreground font-medium max-w-lg mx-auto"
        >
          Track spending, grow savings, and understand where your money goes in a calming, mindful space.
        </motion.p>
      </div>
    </section>
  );
};
