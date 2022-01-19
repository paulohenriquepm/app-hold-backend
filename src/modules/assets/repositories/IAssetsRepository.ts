import { Asset, Prisma } from '.prisma/client';

import { ICreateAssetDTO } from '../dtos/ICreateAssetDTO';
import { IUpdateAssetDTO } from '../dtos/IUpdateAssetDTO';

import { IListAssetsFilters } from '../useCases/listAssets/listAssetsController';
import { FilterOptions } from '../useCases/listAssetsFilterOptions/IListAssetsFilterOptionsUseCase';

export type AssetsListResponse = {
  assets: Asset[];
  nextCursorId: number | undefined;
  totalCount: number;
};
interface IAssetsRepository {
  create(data: ICreateAssetDTO): Promise<Asset>;
  createMany(data: ICreateAssetDTO[]): Promise<Prisma.BatchPayload>;
  update(asset_id: number, data: IUpdateAssetDTO): Promise<Asset>;
  findById(asset_id: number): Promise<Asset>;
  findByB3Ticket(b3_ticket: string): Promise<Asset>;
  list(
    filters: IListAssetsFilters,
    orderBy?: Prisma.AssetOrderByWithRelationInput,
    nextCursor?: string,
  ): Promise<AssetsListResponse>;
  listFilterOptions(): Promise<FilterOptions>;
}

export { IAssetsRepository };
