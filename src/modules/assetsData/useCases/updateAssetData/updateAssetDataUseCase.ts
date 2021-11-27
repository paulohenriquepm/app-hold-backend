import { AssetData } from '.prisma/client';

import { IUpdateAssetDataUseCase } from './IUpdateAssetDataUseCase';
import { IUpdateAssetDataDTO } from '@modules/assetsData/dtos/IUpdateAssetDataDTO';
import { IAssetsDataRepository } from '@modules/assetsData/repositories/IAssetsDataRepository';

class UpdateAssetDataUseCase implements IUpdateAssetDataUseCase {
  constructor(private assetDataRepository: IAssetsDataRepository) {}

  async execute(id: number, data: IUpdateAssetDataDTO): Promise<AssetData> {
    const assetDataUpdated = await this.assetDataRepository.update(id, data);

    return assetDataUpdated;
  }
}

export { UpdateAssetDataUseCase };
