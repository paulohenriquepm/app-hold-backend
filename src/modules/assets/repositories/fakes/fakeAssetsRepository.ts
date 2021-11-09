import { Asset } from '@prisma/client';

import { IAssetsRepository } from '../IAssetsRepository';
import { ICreateAssetDTO } from '@modules/assets/dtos/ICreateAssetDTO';
import { IUpdateAssetDTO } from '@modules/assets/dtos/IUpdateAssetDTO';

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

  async findByB3Ticket(b3_ticket: string): Promise<Asset> {
    const asset = this.assets.find(asset => asset.b3_ticket === b3_ticket);

    return asset;
  }

  update(asset_id: number, data: IUpdateAssetDTO): Promise<Asset> {
    throw new Error('Method not implemented.');
  }
}

export { FakeAssetsRepository };
