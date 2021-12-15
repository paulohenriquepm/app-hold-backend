import { Router } from 'express';

import { listAssetsController } from '@modules/assets/useCases/listAssets';

const assetsRouter = Router();

assetsRouter.get('/', (request, response) => {
  return listAssetsController.handle(request, response);
});

export { assetsRouter };
