interface IUpdateAssetDTO {
  name?: string;
  logo?: string;
  b3_ticket?: string;
  api_ticket?: string;
  sector?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  website?: string;
  employees?: number;
  ceo?: string;
}

export { IUpdateAssetDTO };
