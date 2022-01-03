import { Router } from 'express';

import { createUserWalletAssetController } from '@modules/usersWalletAssets/useCases/createUserWalletAsset';
import { deleteUserWalletAssetController } from '@modules/usersWalletAssets/useCases/deleteUserWalletAsset';
import { listUserWalletAssetsController } from '@modules/usersWalletAssets/useCases/listUserWalletAssets';

const usersWalletAssetsRouter = Router();

usersWalletAssetsRouter.post('/', (request, response) => {
  return createUserWalletAssetController.handle(request, response);
});
usersWalletAssetsRouter.delete('/:id', (request, response) => {
  return deleteUserWalletAssetController.handle(request, response);
});
usersWalletAssetsRouter.get('/:user_wallet_id', (request, response) => {
  return listUserWalletAssetsController.handle(request, response);
});

export { usersWalletAssetsRouter };
