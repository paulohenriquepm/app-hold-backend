import { Asset, Prisma } from '@prisma/client';

import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';
import { IListAssetsUseCase } from './IListAssetsUseCase';
import { IListAssetsFilters } from './listAssetsController';
import { AssetsListResponse } from '@modules/assets/repositories/IAssetsRepository';

class ListAssetsUseCase implements IListAssetsUseCase {
  constructor(private readonly assetsRepository: AssetsRepository) {}

  async execute(
    filters: IListAssetsFilters,
    orderBy: Prisma.AssetOrderByWithRelationInput,
    nextCursor: string,
  ): Promise<AssetsListResponse> {
    return this.assetsRepository.list(filters, orderBy, nextCursor);
  }
}

export { ListAssetsUseCase };
