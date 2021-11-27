import { AssetData } from '.prisma/client';

import { ICreateAssetDataDTO } from '../dtos/ICreateAssetDataDTO';
import { IUpdateAssetDataDTO } from '../dtos/IUpdateAssetDataDTO';

interface IAssetsDataRepository {
  create(data: ICreateAssetDataDTO): Promise<AssetData>;
  update(id: number, data: IUpdateAssetDataDTO): Promise<AssetData>;
  findByAssetId(asset_id: number): Promise<AssetData>;
  findByAssetIdYear(asset_id: number, year: number): Promise<AssetData>;
  findByAssetIdYearQuarter(
    asset_id: number,
    year: number,
    quarter: number,
  ): Promise<AssetData>;
}

export { IAssetsDataRepository };
