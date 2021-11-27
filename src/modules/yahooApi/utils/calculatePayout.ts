const calculatePayout = (dividendsPaid: number, netIncome: number): number => {
  return Math.round((dividendsPaid / netIncome) * 100) * -1;
};

export { calculatePayout };
