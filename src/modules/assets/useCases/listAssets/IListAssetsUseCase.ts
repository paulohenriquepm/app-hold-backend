import { Prisma } from '@prisma/client';

import { AssetsListResponse } from '@modules/assets/repositories/IAssetsRepository';

import { IListAssetsFilters } from './listAssetsController';

interface IListAssetsUseCase {
  execute(
    filters: IListAssetsFilters,
    orderBy: Prisma.AssetOrderByWithRelationInput,
    nextCursor: string,
  ): Promise<AssetsListResponse>;
}

export { IListAssetsUseCase };
