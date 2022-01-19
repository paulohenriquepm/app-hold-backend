import { ListAssetsFilterOptionsController } from './listAssetsFilterOptionsController';
import { ListAssetsFilterOptionsUseCase } from './listAssetsFilterOptionsUseCase';
import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';

const assetsRepository = new AssetsRepository();

const listAssetsFilterOptionsUseCase = new ListAssetsFilterOptionsUseCase(
  assetsRepository,
);

const listAssetsFilterOptionsController = new ListAssetsFilterOptionsController(
  listAssetsFilterOptionsUseCase,
);

export { listAssetsFilterOptionsController };
