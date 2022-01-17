import { IUpdateAssetDTO } from '@modules/assets/dtos/IUpdateAssetDTO';
import { IYahooApiResponseData } from '../useCases/importData/IYahooApiResponse';

import { IAssetToImport } from './IAssetToImport';

interface IMapAssetToUpdate {
  execute(
    asset: IAssetToImport,
    apiResponseData: IYahooApiResponseData,
  ): IUpdateAssetDTO;
}

const mapAssetToUpdate = (
  apiResponseData: IYahooApiResponseData,
): IUpdateAssetDTO => {
  const assetData = {
    sector: apiResponseData.quoteSummary.result[0].assetProfile?.sector,
    industry: apiResponseData.quoteSummary.result[0].assetProfile?.industry,
    address: apiResponseData.quoteSummary.result[0].assetProfile?.address1,
    city: apiResponseData.quoteSummary.result[0].assetProfile?.city,
    state: apiResponseData.quoteSummary.result[0].assetProfile?.state,
    country: apiResponseData.quoteSummary.result[0].assetProfile?.country,
    zip: apiResponseData.quoteSummary.result[0].assetProfile?.zip,
    website: apiResponseData.quoteSummary.result[0].assetProfile?.website,
    employees:
      apiResponseData.quoteSummary.result[0].assetProfile?.fullTimeEmployees,
    ceo:
      apiResponseData.quoteSummary.result[0]?.assetProfile?.companyOfficers[0]
        ?.name || null,
    total_stocks: apiResponseData.quoteSummary.result[0]?.defaultKeyStatistics
      ?.sharesOutstanding?.raw
      ? BigInt(
          apiResponseData.quoteSummary.result[0].defaultKeyStatistics
            .sharesOutstanding.raw,
        )
      : null,
    last_12_months_dividends: apiResponseData.quoteSummary.result[0]
      ?.cashflowStatementHistory?.cashflowStatements[0]?.dividendsPaid?.raw
      ? BigInt(
          apiResponseData.quoteSummary.result[0].cashflowStatementHistory
            .cashflowStatements[0]?.dividendsPaid?.raw * -1,
        )
      : null,
    price: apiResponseData.quoteSummary.result[0].price.regularMarketPrice.raw,
  } as IUpdateAssetDTO;

  return assetData;
};

export { mapAssetToUpdate, IMapAssetToUpdate };
