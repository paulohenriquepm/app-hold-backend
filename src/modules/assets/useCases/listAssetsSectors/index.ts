import { ListAssetsSectorsController } from './listAssetsSectorsController';
import { ListAssetsSectorsUseCase } from './listAssetsSectorsUseCase';
import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';

const assetsRepository = new AssetsRepository();

const listAssetsSectorsUseCase = new ListAssetsSectorsUseCase(assetsRepository);

const listAssetsSectorsController = new ListAssetsSectorsController(
  listAssetsSectorsUseCase,
);

export { listAssetsSectorsController };
