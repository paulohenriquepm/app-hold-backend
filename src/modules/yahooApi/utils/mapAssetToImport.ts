import { ICreateAssetDTO } from '@modules/assets/dtos/ICreateAssetDTO';
import { IYahooApiResponseData } from '../useCases/importData/IYahooApiResponse';

import { IAssetToImport } from './IAssetToImport';

interface IMapAssetToImport {
  execute(
    asset: IAssetToImport,
    apiResponseData: IYahooApiResponseData,
  ): ICreateAssetDTO;
}

const mapAssetToImport = (
  asset: IAssetToImport,
  apiResponseData: IYahooApiResponseData,
): ICreateAssetDTO => {
  const assetData = {
    name: asset.name,
    logo: asset.logo,
    b3_ticket: asset.b3_ticket,
    api_ticket: asset.api_ticket,
    sector: apiResponseData.quoteSummary.result[0].assetProfile.sector,
    address: apiResponseData.quoteSummary.result[0].assetProfile.address1,
    city: apiResponseData.quoteSummary.result[0].assetProfile.city,
    state: apiResponseData.quoteSummary.result[0].assetProfile.state,
    country: apiResponseData.quoteSummary.result[0].assetProfile.country,
    zip: apiResponseData.quoteSummary.result[0].assetProfile.zip,
    website: apiResponseData.quoteSummary.result[0].assetProfile.website,
    employees:
      apiResponseData.quoteSummary.result[0].assetProfile.fullTimeEmployees,
    ceo: apiResponseData.quoteSummary.result[0].assetProfile.companyOfficers[0]
      .name,
    total_stocks: BigInt(
      apiResponseData.quoteSummary.result[0].defaultKeyStatistics
        .sharesOutstanding.raw,
    ),
  } as ICreateAssetDTO;

  return assetData;
};

export { mapAssetToImport, IMapAssetToImport };
