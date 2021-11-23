import { ICreateAssetDTO } from '@modules/assets/dtos/ICreateAssetDTO';
import { IYahooApiResponseData } from '../useCases/importDataUseCase/IYahooApiResponse';

import { ICompanyToImport } from './ICompanyToImport';

const mapAssetDataToImport = (
  company: ICompanyToImport,
  apiResponseData: IYahooApiResponseData,
) => {
  const assetData = {
    name: company.name,
    logo: company.logo,
    b3_ticket: company.b3_ticket,
    api_ticket: company.api_ticket,
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
  } as ICreateAssetDTO;

  return assetData;
};
export { mapAssetDataToImport };
