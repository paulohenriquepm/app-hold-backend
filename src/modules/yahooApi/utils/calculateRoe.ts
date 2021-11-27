import { calculateEquity } from './calculateEquity';

const calculateRoe = (
  minorityInterest: number,
  totalStockholderEquity: number,
  netIncome: bigint,
): number => {
  const equity = calculateEquity(minorityInterest, totalStockholderEquity);

  return Math.round(Number(netIncome / equity) * 100);
};

export { calculateRoe };
