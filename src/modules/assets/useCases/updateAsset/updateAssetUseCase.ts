import { Asset } from '.prisma/client';

import { IAssetsRepository } from '@modules/assets/repositories/IAssetsRepository';
import { IUpdateAssetDTO } from '@modules/assets/dtos/IUpdateAssetDTO';
import { IUpdateAssetUseCase } from './IUpdateAssetUseCase';

class UpdateAssetUseCase implements IUpdateAssetUseCase {
  constructor(private assetRepository: IAssetsRepository) {}

  async execute(asset_id: number, data: IUpdateAssetDTO): Promise<Asset> {
    const assetUpdated = await this.assetRepository.update(asset_id, data);

    return assetUpdated;
  }
}

export { UpdateAssetUseCase };
