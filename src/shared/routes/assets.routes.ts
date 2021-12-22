import { Router } from 'express';

import { listAssetsController } from '@modules/assets/useCases/listAssets';
import { showAssetController } from '@modules/assets/useCases/showAsset';

const assetsRouter = Router();

assetsRouter.get('/', (request, response) => {
  return listAssetsController.handle(request, response);
});

assetsRouter.get('/:id', (request, response) => {
  return showAssetController.handle(request, response);
});

export { assetsRouter };
