const calculateEquity = (
  minorityInterest: number,
  totalStockholderEquity: number,
): bigint => {
  return BigInt(minorityInterest + totalStockholderEquity);
};

export { calculateEquity };
