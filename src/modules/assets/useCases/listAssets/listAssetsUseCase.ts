import { Asset, Prisma } from '@prisma/client';

import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';
import { IListAssetsUseCase } from './IListAssetsUseCase';
import { IListAssetsFilters } from './listAssetsController';

class ListAssetsUseCase implements IListAssetsUseCase {
  constructor(private readonly assetsRepository: AssetsRepository) {}

  async execute(
    filters: IListAssetsFilters,
    orderBy: Prisma.AssetOrderByWithRelationInput,
  ): Promise<Asset[]> {
    return this.assetsRepository.list(filters, orderBy);
  }
}

export { ListAssetsUseCase };
