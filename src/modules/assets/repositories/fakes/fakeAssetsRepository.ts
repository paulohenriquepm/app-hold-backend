import { Asset } from '@prisma/client';

import { IAssetsRepository } from '../IAssetsRepository';
import { ICreateAssetDTO } from '@modules/assets/dtos/ICreateWalletDTO';

class FakeAssetsRepository implements IAssetsRepository {
  assets: Asset[] = [];

  async create(data: ICreateAssetDTO): Promise<Asset> {
    const asset: Asset = {} as Asset;

    Object.assign(asset, {
      id: this.assets.length + 1,
      ...data,
    });

    this.assets.push(asset);

    return asset;
  }
}

export { FakeAssetsRepository };
