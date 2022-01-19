import { Router } from 'express';

import { listAssetsController } from '@modules/assets/useCases/listAssets';
import { showAssetController } from '@modules/assets/useCases/showAsset';
import { listAssetsFilterOptionsController } from '@modules/assets/useCases/listAssetsFilterOptions';
import { AssetsDataRepository } from '@modules/assetsData/repositories/implementations/assetsDataRepository';

const assetsRouter = Router();

const assetsDataRepository = new AssetsDataRepository();

assetsRouter.get('/', (request, response) => {
  return listAssetsController.handle(request, response);
});
assetsRouter.get('/:id', (request, response) => {
  return showAssetController.handle(request, response);
});
assetsRouter.get('/filter/all-options', (request, response) => {
  return listAssetsFilterOptionsController.handle(request, response);
});

export { assetsRouter };
