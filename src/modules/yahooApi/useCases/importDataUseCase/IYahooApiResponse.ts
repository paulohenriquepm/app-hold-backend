interface ICompanyOfficers {
  name: string;
}

interface IAssetProfile {
  address1: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  website: string;
  sector: string;
  fullTimeEmployees: number;
  companyOfficers: [ICompanyOfficers];
}

interface IQuoteSummaryResult {
  assetProfile: IAssetProfile;
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
