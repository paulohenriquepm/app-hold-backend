const calculateMarketValue = (
  sharesOutstanding: number,
  price: number,
): number => {
  return Math.round(sharesOutstanding * price);
};

export { calculateMarketValue };
