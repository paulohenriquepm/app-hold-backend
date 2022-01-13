import { Router } from 'express';

import { listAssetsController } from '@modules/assets/useCases/listAssets';
import { showAssetController } from '@modules/assets/useCases/showAsset';
import { listAssetsSectorsController } from '@modules/assets/useCases/listAssetsSectors';
import { AssetsDataRepository } from '@modules/assetsData/repositories/implementations/assetsDataRepository';

const assetsRouter = Router();

const assetsDataRepository = new AssetsDataRepository();

assetsRouter.get('/', (request, response) => {
  return listAssetsController.handle(request, response);
});
assetsRouter.get('/:id', (request, response) => {
  return showAssetController.handle(request, response);
});
assetsRouter.get('/teste/teste', async (request, response) => {
  const a = await assetsDataRepository.findByAssetIdYearQuarter(123, 2021, 9);
  return response.json(a);
});
assetsRouter.get('/select/sectors', (request, response) => {
  return listAssetsSectorsController.handle(request, response);
});

export { assetsRouter };
