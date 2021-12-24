import { AssetData } from '.prisma/client';

import { ICreateAssetDataDTO } from '@modules/assetsData/dtos/ICreateAssetDataDTO';
import { IAssetsDataRepository } from '@modules/assetsData/repositories/IAssetsDataRepository';

import { ICreateAssetDataUseCase } from './ICreateAssetDataUseCase';

class CreateAssetDataUseCase implements ICreateAssetDataUseCase {
  constructor(private assetDataRepository: IAssetsDataRepository) {}

  async execute(data: ICreateAssetDataDTO): Promise<AssetData> {
    const assetData = await this.assetDataRepository.create(data);

    return assetData;
  }
}

export { CreateAssetDataUseCase };
