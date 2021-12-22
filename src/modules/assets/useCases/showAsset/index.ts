import { ShowAssetController } from './showAssetController';
import { ShowAssetUseCase } from './showAssetUseCase';
import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';

const assetRepository = new AssetsRepository();

const showAssetUseCase = new ShowAssetUseCase(assetRepository);

const showAssetController = new ShowAssetController(showAssetUseCase);

export { showAssetController };
