import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';

import {
  FilterOptions,
  IListAssetsFilterOptionsUseCase,
} from './IListAssetsFilterOptionsUseCase';

class ListAssetsFilterOptionsUseCase
  implements IListAssetsFilterOptionsUseCase
{
  constructor(private readonly assetsRepository: AssetsRepository) {}

  async execute(): Promise<FilterOptions> {
    return this.assetsRepository.listFilterOptions();
  }
}

export { ListAssetsFilterOptionsUseCase };
