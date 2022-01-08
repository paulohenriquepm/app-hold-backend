import { Asset, Prisma } from '.prisma/client';

import { ICreateAssetDTO } from '../dtos/ICreateAssetDTO';
import { IUpdateAssetDTO } from '../dtos/IUpdateAssetDTO';

import { IListAssetsFilters } from '../useCases/listAssets/listAssetsController';

interface IAssetsRepository {
  create(data: ICreateAssetDTO): Promise<Asset>;
  createMany(data: ICreateAssetDTO[]): Promise<Prisma.BatchPayload>;
  update(asset_id: number, data: IUpdateAssetDTO): Promise<Asset>;
  findById(asset_id: number): Promise<Asset>;
  findByB3Ticket(b3_ticket: string): Promise<Asset>;
  list(filters: IListAssetsFilters): Promise<Asset[]>;
  listSectors(): Promise<string[]>;
}

export { IAssetsRepository };
