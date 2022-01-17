interface ICompanyOfficers {
  name: string;
}

interface IAssetProfile {
  address1: string;
  city: string;
  state?: string;
  country: string;
  zip?: string;
  website?: string;
  sector: string;
  industry?: string;
  fullTimeEmployees?: number;
  companyOfficers?: [ICompanyOfficers];
}

interface IRawAndFormattedApiValues {
  raw: number;
  fmt: string;
}

interface ICashflowStatementHistory {
  endDate: IRawAndFormattedApiValues;
  netIncome: IRawAndFormattedApiValues;
  dividendsPaid?: IRawAndFormattedApiValues;
  totalCashFromOperatingActivities: IRawAndFormattedApiValues;
  totalCashFromFinancingActivities: IRawAndFormattedApiValues;
}
interface IIncomeStatementHistory {
  endDate: IRawAndFormattedApiValues;
  totalRevenue: IRawAndFormattedApiValues;
  ebit: IRawAndFormattedApiValues;
}

interface IBalanceSheetStatements {
  endDate: IRawAndFormattedApiValues;
  cash: IRawAndFormattedApiValues;
  minorityInterest: IRawAndFormattedApiValues;
  totalStockholderEquity: IRawAndFormattedApiValues;
}

interface IDefaultKeyStatistics {
  sharesOutstanding: IRawAndFormattedApiValues;
}

interface IPrice {
  regularMarketPrice: IRawAndFormattedApiValues;
}
interface IQuoteSummaryResult {
  assetProfile?: IAssetProfile;
  cashflowStatementHistory?: {
    cashflowStatements: ICashflowStatementHistory[];
  };
  cashflowStatementHistoryQuarterly?: {
    cashflowStatements: ICashflowStatementHistory[];
  };
  incomeStatementHistory?: {
    incomeStatementHistory: IIncomeStatementHistory[];
  };
  incomeStatementHistoryQuarterly?: {
    incomeStatementHistory: IIncomeStatementHistory[];
  };
  balanceSheetHistory?: {
    balanceSheetStatements: IBalanceSheetStatements[];
  };
  balanceSheetHistoryQuarterly?: {
    balanceSheetStatements: IBalanceSheetStatements[];
  };
  defaultKeyStatistics?: IDefaultKeyStatistics;
  price: IPrice;
}

interface IYahooApiResponse {
  data: {
    quoteSummary: {
      result: [IQuoteSummaryResult];
    };
  };
}

interface IYahooApiResponseData {
  quoteSummary: {
    result: [IQuoteSummaryResult];
  };
}

export { IYahooApiResponse, IYahooApiResponseData };
