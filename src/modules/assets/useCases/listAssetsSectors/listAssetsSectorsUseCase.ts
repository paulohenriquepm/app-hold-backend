import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';

import { IListAssetsSectorsUseCase } from './IListAssetsSectorsUseCase';

class ListAssetsSectorsUseCase implements IListAssetsSectorsUseCase {
  constructor(private readonly assetsRepository: AssetsRepository) {}

  async execute(): Promise<string[]> {
    return this.assetsRepository.listSectors();
  }
}

export { ListAssetsSectorsUseCase };
