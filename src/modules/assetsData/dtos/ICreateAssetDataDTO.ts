interface ICreateAssetDataDTO {
  revenue: bigint;
  net_income: bigint;
  dividends_paid: bigint;
  fco: bigint;
  fcf: bigint;
  ebit: bigint;
  cash: bigint;
  equity: bigint;
  net_margin: number;
  roe?: number;
  payout: number;
  year: number;
  quarter?: number;
  assetId: number;
}

export { ICreateAssetDataDTO };
