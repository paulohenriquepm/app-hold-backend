import { Asset } from '.prisma/client';
import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';
import { IListAssetsUseCase } from './IListAssetsUseCase';

class ListAssetsUseCase implements IListAssetsUseCase {
  constructor(private readonly assetsRepository: AssetsRepository) {}

  async execute(): Promise<Asset[]> {
    return this.assetsRepository.list();
  }
}

export { ListAssetsUseCase };
