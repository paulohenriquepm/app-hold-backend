import { ICreateAssetDataDTO } from '@modules/assetsData/dtos/ICreateAssetDataDTO';
import { IYahooApiResponseData } from '../useCases/importData/IYahooApiResponse';

import { calculateEquity } from './calculateEquity';
import { calculateNetMargin } from './calculateNetMargin';
import { calculatePayout } from './calculatePayout';
import { calculateRoe } from './calculateRoe';

const mapAssetDataByQuarterToImport = (
  asset_id: number,
  apiResponseData: IYahooApiResponseData,
  index: number,
) => {
  const assetData = {
    revenue: apiResponseData.quoteSummary.result[0]
      ?.incomeStatementHistoryQuarterly?.incomeStatementHistory[index]
      ?.totalRevenue?.raw
      ? BigInt(
          apiResponseData.quoteSummary.result[0].incomeStatementHistoryQuarterly
            .incomeStatementHistory[index].totalRevenue.raw,
        )
      : null,
    net_income: apiResponseData.quoteSummary.result[0]
      ?.cashflowStatementHistoryQuarterly?.cashflowStatements[index]?.netIncome
      ?.raw
      ? BigInt(
          apiResponseData.quoteSummary.result[0]
            .cashflowStatementHistoryQuarterly.cashflowStatements[index]
            .netIncome.raw,
        )
      : null,
    dividends_paid: apiResponseData.quoteSummary.result[0]
      ?.cashflowStatementHistoryQuarterly?.cashflowStatements[index]
      ?.dividendsPaid?.raw
      ? BigInt(
          apiResponseData.quoteSummary.result[0]
            .cashflowStatementHistoryQuarterly.cashflowStatements[index]
            .dividendsPaid.raw * -1,
        )
      : null,
    fco: apiResponseData.quoteSummary.result[0]
      ?.cashflowStatementHistoryQuarterly?.cashflowStatements[index]
      ?.totalCashFromOperatingActivities?.raw
      ? BigInt(
          apiResponseData.quoteSummary.result[0]
            .cashflowStatementHistoryQuarterly.cashflowStatements[index]
            ?.totalCashFromOperatingActivities?.raw,
        )
      : null,
    fcf: apiResponseData.quoteSummary.result[0]
      ?.cashflowStatementHistoryQuarterly?.cashflowStatements[index]
      ?.totalCashFromFinancingActivities?.raw
      ? BigInt(
          apiResponseData.quoteSummary.result[0]
            .cashflowStatementHistoryQuarterly.cashflowStatements[index]
            .totalCashFromFinancingActivities.raw * -1,
        )
      : null,
    ebit: apiResponseData.quoteSummary.result[0]
      ?.incomeStatementHistoryQuarterly?.incomeStatementHistory[index]?.ebit
      ?.raw
      ? BigInt(
          apiResponseData.quoteSummary.result[0].incomeStatementHistoryQuarterly
            .incomeStatementHistory[index].ebit.raw,
        )
      : null,
    cash: apiResponseData.quoteSummary.result[0]?.balanceSheetHistoryQuarterly
      ?.balanceSheetStatements[index]?.cash?.raw
      ? BigInt(
          apiResponseData.quoteSummary.result[0].balanceSheetHistoryQuarterly
            .balanceSheetStatements[index].cash.raw,
        )
      : null,
    equity:
      apiResponseData?.quoteSummary?.result[0]?.balanceSheetHistoryQuarterly
        ?.balanceSheetStatements[index]?.minorityInterest?.raw &&
      apiResponseData?.quoteSummary?.result[0]?.balanceSheetHistoryQuarterly
        ?.balanceSheetStatements[index]?.totalStockholderEquity?.raw
        ? calculateEquity(
            apiResponseData.quoteSummary.result[0].balanceSheetHistoryQuarterly
              .balanceSheetStatements[index].minorityInterest.raw,
            apiResponseData.quoteSummary.result[0].balanceSheetHistoryQuarterly
              .balanceSheetStatements[index].totalStockholderEquity.raw,
          )
        : null,
    net_margin:
      apiResponseData?.quoteSummary.result[0]?.cashflowStatementHistoryQuarterly
        ?.cashflowStatements[index]?.netIncome?.raw &&
      apiResponseData?.quoteSummary?.result[0]?.incomeStatementHistoryQuarterly
        ?.incomeStatementHistory[index]?.totalRevenue?.raw
        ? calculateNetMargin(
            apiResponseData.quoteSummary.result[0]
              .cashflowStatementHistoryQuarterly.cashflowStatements[index]
              .netIncome.raw,
            apiResponseData.quoteSummary.result[0]
              .incomeStatementHistoryQuarterly.incomeStatementHistory[index]
              .totalRevenue.raw,
          )
        : null,
    roe:
      apiResponseData?.quoteSummary?.result[0]?.balanceSheetHistoryQuarterly
        ?.balanceSheetStatements[index]?.minorityInterest?.raw &&
      apiResponseData?.quoteSummary?.result[0]?.balanceSheetHistoryQuarterly
        ?.balanceSheetStatements[index]?.totalStockholderEquity?.raw &&
      apiResponseData?.quoteSummary?.result[0]
        ?.cashflowStatementHistoryQuarterly?.cashflowStatements[index]
        ?.netIncome?.raw
        ? calculateRoe(
            apiResponseData.quoteSummary.result[0].balanceSheetHistoryQuarterly
              .balanceSheetStatements[index].minorityInterest.raw,
            apiResponseData.quoteSummary.result[0].balanceSheetHistoryQuarterly
              .balanceSheetStatements[index].totalStockholderEquity.raw,
            BigInt(
              apiResponseData.quoteSummary.result[0]
                .cashflowStatementHistoryQuarterly.cashflowStatements[index]
                .netIncome.raw,
            ),
          )
        : null,
    payout:
      apiResponseData?.quoteSummary?.result[0]
        ?.cashflowStatementHistoryQuarterly?.cashflowStatements[index]
        ?.dividendsPaid?.raw &&
      apiResponseData?.quoteSummary?.result[0]
        ?.cashflowStatementHistoryQuarterly?.cashflowStatements[index]
        ?.netIncome?.raw
        ? calculatePayout(
            apiResponseData.quoteSummary.result[0]
              .cashflowStatementHistoryQuarterly.cashflowStatements[index]
              .dividendsPaid.raw,
            apiResponseData.quoteSummary.result[0]
              .cashflowStatementHistoryQuarterly.cashflowStatements[index]
              .netIncome.raw,
          )
        : null,
    year: getYear(
      apiResponseData.quoteSummary.result[0].balanceSheetHistoryQuarterly
        .balanceSheetStatements[index].endDate.raw,
    ),
    quarter: getQuarter(
      apiResponseData.quoteSummary.result[0].balanceSheetHistoryQuarterly
        .balanceSheetStatements[index].endDate.raw,
    ),
    assetId: asset_id,
  } as ICreateAssetDataDTO;

  return assetData;
};

const getYear = (rawEndDate: number): number => {
  return new Date(rawEndDate * 1000).getFullYear();
};

const getQuarter = (rawEndDate: number): number => {
  return new Date(rawEndDate * 1000).getMonth() + 1;
};

export { mapAssetDataByQuarterToImport };
