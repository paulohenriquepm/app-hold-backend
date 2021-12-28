import { Router } from 'express';

import { createUserWalletAssetController } from '@modules/usersWalletAssets/useCases/createUserWalletAsset';
import { deleteUserWalletAssetController } from '@modules/usersWalletAssets/useCases/deleteUserWalletAsset';

const usersWalletAssetsRouter = Router();

usersWalletAssetsRouter.post('/', (request, response) => {
  return createUserWalletAssetController.handle(request, response);
});
usersWalletAssetsRouter.delete('/:id', (request, response) => {
  return deleteUserWalletAssetController.handle(request, response);
});

export { usersWalletAssetsRouter };
