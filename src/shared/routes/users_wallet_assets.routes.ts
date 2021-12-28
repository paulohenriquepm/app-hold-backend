import { Router } from 'express';

import { createUserWalletAssetController } from '@modules/usersWalletAssets/useCases/createUserWalletAsset';

const usersWalletAssetsRouter = Router();

usersWalletAssetsRouter.post('/', (request, response) => {
  return createUserWalletAssetController.handle(request, response);
});

export { usersWalletAssetsRouter };
