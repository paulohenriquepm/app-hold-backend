import { ICreateAssetDataDTO } from '@modules/assetsData/dtos/ICreateAssetDataDTO';
import { IYahooApiResponseData } from '../useCases/importData/IYahooApiResponse';

import { calculateEquity } from './calculateEquity';
import { calculateNetMargin } from './calculateNetMargin';
import { calculatePayout } from './calculatePayout';
import { calculateRoe } from './calculateRoe';

const mapAssetDataByYearToImport = (
  asset_id: number,
  apiResponseData: IYahooApiResponseData,
  index: number,
) => {
  const assetData = {
    revenue: BigInt(
      apiResponseData.quoteSummary.result[0].incomeStatementHistory
        .incomeStatementHistory[index].totalRevenue.raw,
    ),
    net_income: BigInt(
      apiResponseData.quoteSummary.result[0].cashflowStatementHistory
        .cashflowStatements[index].netIncome.raw,
    ),
    dividends_paid: BigInt(
      apiResponseData.quoteSummary.result[0].cashflowStatementHistory
        .cashflowStatements[index].dividendsPaid.raw * -1,
    ),
    fco: BigInt(
      apiResponseData.quoteSummary.result[0].cashflowStatementHistory
        .cashflowStatements[index].totalCashFromOperatingActivities.raw,
    ),
    fcf: BigInt(
      apiResponseData.quoteSummary.result[0].cashflowStatementHistory
        .cashflowStatements[index].totalCashFromFinancingActivities.raw * -1,
    ),
    ebit: BigInt(
      apiResponseData.quoteSummary.result[0].incomeStatementHistory
        .incomeStatementHistory[index].ebit.raw,
    ),
    cash: BigInt(
      apiResponseData.quoteSummary.result[0].balanceSheetHistory
        .balanceSheetStatements[index].cash.raw,
    ),
    equity: calculateEquity(
      apiResponseData.quoteSummary.result[0].balanceSheetHistory
        .balanceSheetStatements[index].minorityInterest.raw,
      apiResponseData.quoteSummary.result[0].balanceSheetHistory
        .balanceSheetStatements[index].totalStockholderEquity.raw,
    ),
    net_margin: calculateNetMargin(
      apiResponseData.quoteSummary.result[0].cashflowStatementHistory
        .cashflowStatements[index].netIncome.raw,
      apiResponseData.quoteSummary.result[0].incomeStatementHistory
        .incomeStatementHistory[index].totalRevenue.raw,
    ),
    roe: calculateRoe(
      apiResponseData.quoteSummary.result[0].balanceSheetHistory
        .balanceSheetStatements[index].minorityInterest.raw,
      apiResponseData.quoteSummary.result[0].balanceSheetHistory
        .balanceSheetStatements[index].totalStockholderEquity.raw,
      BigInt(
        apiResponseData.quoteSummary.result[0].cashflowStatementHistory
          .cashflowStatements[index].netIncome.raw,
      ),
    ),
    payout: calculatePayout(
      apiResponseData.quoteSummary.result[0].cashflowStatementHistory
        .cashflowStatements[index].dividendsPaid.raw,
      apiResponseData.quoteSummary.result[0].cashflowStatementHistory
        .cashflowStatements[index].netIncome.raw,
    ),
    year: getYear(
      apiResponseData.quoteSummary.result[0].cashflowStatementHistory
        .cashflowStatements[index].endDate.raw,
    ),
    assetId: asset_id,
  } as ICreateAssetDataDTO;

  return assetData;
};

const getYear = (rawEndDate: number): number => {
  return new Date(rawEndDate * 1000).getFullYear();
};

export { mapAssetDataByYearToImport };
