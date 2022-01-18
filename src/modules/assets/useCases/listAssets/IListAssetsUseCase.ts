import { Asset, Prisma } from '@prisma/client';

import { IListAssetsFilters } from './listAssetsController';

interface IListAssetsUseCase {
  execute(
    filters: IListAssetsFilters,
    orderBy: Prisma.AssetOrderByWithRelationInput,
  ): Promise<Asset[]>;
}

export { IListAssetsUseCase };
