import { ListAssetsController } from './listAssetsController';
import { ListAssetsUseCase } from './listAssetsUseCase';
import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';

const assetsRepository = new AssetsRepository();

const listAssetsUseCase = new ListAssetsUseCase(assetsRepository);

const listAssetsController = new ListAssetsController(listAssetsUseCase);

export { listAssetsController };
