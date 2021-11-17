import { AssetData } from '.prisma/client';

import { ICreateAssetDataDTO } from '../dtos/ICreateAssetDataDTO';

interface IAssetsDataRepository {
  create(data: ICreateAssetDataDTO): Promise<AssetData>;
  findByAssetId(asset_id: number): Promise<AssetData>;
}

export { IAssetsDataRepository };
