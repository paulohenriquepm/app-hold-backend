import { Router } from 'express';

import { listAssetsController } from '@modules/assets/useCases/listAssets';
import { showAssetController } from '@modules/assets/useCases/showAsset';
import { listAssetsSectorsController } from '@modules/assets/useCases/listAssetsSectors';

const assetsRouter = Router();

assetsRouter.get('/', (request, response) => {
  return listAssetsController.handle(request, response);
});
assetsRouter.get('/:id', (request, response) => {
  return showAssetController.handle(request, response);
});
assetsRouter.get('/select/sectors', (request, response) => {
  return listAssetsSectorsController.handle(request, response);
});

export { assetsRouter };
