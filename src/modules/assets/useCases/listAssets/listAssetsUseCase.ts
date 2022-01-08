import { Asset } from '.prisma/client';
import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';
import { IListAssetsUseCase } from './IListAssetsUseCase';
import { IListAssetsFilters } from './listAssetsController';

class ListAssetsUseCase implements IListAssetsUseCase {
  constructor(private readonly assetsRepository: AssetsRepository) {}

  async execute(filters: IListAssetsFilters): Promise<Asset[]> {
    return this.assetsRepository.list(filters);
  }
}

export { ListAssetsUseCase };
