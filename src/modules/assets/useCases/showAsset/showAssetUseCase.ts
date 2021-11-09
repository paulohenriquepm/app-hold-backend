import { Asset } from '@prisma/client';

import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';
import { IShowAssetUseCase } from './IShowAssetUseCase';

class ShowAssetUseCase implements IShowAssetUseCase {
  constructor(private assetRepository: AssetsRepository) {}

  async execute(asset_id: number): Promise<Asset> {
    const asset = await this.assetRepository.findById(asset_id);

    return asset;
  }
}

export { ShowAssetUseCase };
