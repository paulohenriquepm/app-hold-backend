import { ICreateAssetDTO } from '@modules/assets/dtos/ICreateAssetDTO';
import { IYahooApiResponseData } from '../useCases/importData/IYahooApiResponse';

import { IAssetToImport } from './IAssetToImport';

class MapAssetToImport {
  execute(asset: any, apiResponseData: any): any {
    // const assetData = {
    //   name: asset.name,
    //   logo: asset.logo,
    //   b3_ticket: asset.b3_ticket,
    //   api_ticket: asset.api_ticket,
    //   sector: apiResponseData.quoteSummary.result[0].assetProfile.sector,
    //   address: apiResponseData.quoteSummary.result[0].assetProfile.address1,
    //   city: apiResponseData.quoteSummary.result[0].assetProfile.city,
    //   state: apiResponseData.quoteSummary.result[0].assetProfile.state,
    //   country: apiResponseData.quoteSummary.result[0].assetProfile.country,
    //   zip: apiResponseData.quoteSummary.result[0].assetProfile.zip,
    //   website: apiResponseData.quoteSummary.result[0].assetProfile.website,
    //   employees:
    //     apiResponseData.quoteSummary.result[0].assetProfile.fullTimeEmployees,
    //   ceo: apiResponseData.quoteSummary.result[0].assetProfile
    //     .companyOfficers[0].name,
    // } as ICreateAssetDTO;

    return 1;
  }
}

export { MapAssetToImport };
