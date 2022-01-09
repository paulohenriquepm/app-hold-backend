import { Asset, Prisma } from '@prisma/client';

import { IAssetsRepository } from '../IAssetsRepository';
import { ICreateAssetDTO } from '@modules/assets/dtos/ICreateAssetDTO';
import { IUpdateAssetDTO } from '@modules/assets/dtos/IUpdateAssetDTO';
import { IListAssetsFilters } from '@modules/assets/useCases/listAssets/listAssetsController';

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

  async createMany(data: ICreateAssetDTO[]): Promise<Prisma.BatchPayload> {
    data.forEach(assetItem => {
      let asset: Asset = {} as Asset;

      Object.assign(asset, {
        id: this.assets.length + 1,
        ...assetItem,
      });

      this.assets.push(asset);
    });

    return { count: data.length };
  }

  async list(filters: IListAssetsFilters): Promise<Asset[]> {
    return this.assets;
  }

  async listSectors(): Promise<string[]> {
    return this.assets.map(asset => asset.sector);
  }

  async findByB3Ticket(b3_ticket: string): Promise<Asset> {
    const asset = this.assets.find(asset => asset.b3_ticket === b3_ticket);

    return asset;
  }

  async findById(id: number): Promise<Asset> {
    const asset = this.assets.find(asset => asset.id === id);

    return asset;
  }

  update(asset_id: number, data: IUpdateAssetDTO): Promise<Asset> {
    throw new Error('Method not implemented.');
  }
}

export { FakeAssetsRepository };
