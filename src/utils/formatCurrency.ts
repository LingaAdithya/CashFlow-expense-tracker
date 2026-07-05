export const formatCurrency = (amount: number): string => {
  if (amount >= 1e9) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    }).format(amount / 1e9) + 'B';
  }
  
  if (amount >= 1e6) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    }).format(amount / 1e6) + 'M';
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
