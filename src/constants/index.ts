import type { Category } from '@/types';
import { 
  Utensils, 
  ShoppingBag, 
  FileText, 
  Wallet, 
  Briefcase, 
  Film, 
  Plane, 
  HeartPulse, 
  TrendingUp, 
  GraduationCap, 
  Zap, 
  MoreHorizontal 
} from 'lucide-react';

export const CATEGORIES: { label: Category; icon: React.ElementType; color: string }[] = [
  { label: 'Food', icon: Utensils, color: '#f59e0b' },
  { label: 'Shopping', icon: ShoppingBag, color: '#ec4899' },
  { label: 'Bills', icon: FileText, color: '#ef4444' },
  { label: 'Salary', icon: Wallet, color: '#10b981' },
  { label: 'Freelance', icon: Briefcase, color: '#8b5cf6' },
  { label: 'Entertainment', icon: Film, color: '#3b82f6' },
  { label: 'Travel', icon: Plane, color: '#06b6d4' },
  { label: 'Healthcare', icon: HeartPulse, color: '#f43f5e' },
  { label: 'Investment', icon: TrendingUp, color: '#84cc16' },
  { label: 'Education', icon: GraduationCap, color: '#6366f1' },
  { label: 'Utilities', icon: Zap, color: '#eab308' },
  { label: 'Other', icon: MoreHorizontal, color: '#9ca3af' },
];
