const calculateNetMargin = (
  netIncome: number,
  totalRevenue: number,
): number => {
  return Math.round((netIncome / totalRevenue) * 100);
};

export { calculateNetMargin };
