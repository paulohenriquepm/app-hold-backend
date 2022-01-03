import { UsersWalletAssetsRepository } from '@modules/usersWalletAssets/repositories/implementations/usersWalletAssetsRepository';
import { ListUserWalletAssetsController } from './listUserWalletAssetsController';
import { ListUserWalletAssetsUseCase } from './listUserWalletAssetsUseCase';

const usersWalletAssetsRepository = new UsersWalletAssetsRepository();
const listUserWalletAssetsUseCase = new ListUserWalletAssetsUseCase(
  usersWalletAssetsRepository,
);
const listUserWalletAssetsController = new ListUserWalletAssetsController(
  listUserWalletAssetsUseCase,
);

export { listUserWalletAssetsController };
