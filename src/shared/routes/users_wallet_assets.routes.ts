import { Router } from 'express';

import { createUsersWalletAssetsController } from '@modules/usersWalletAssets/useCases/createUsersWalletAssets';

const usersWalletAssetsRouter = Router();

usersWalletAssetsRouter.post('/', (request, response) => {
  return createUsersWalletAssetsController.handle(request, response);
});

export { usersWalletAssetsRouter };
