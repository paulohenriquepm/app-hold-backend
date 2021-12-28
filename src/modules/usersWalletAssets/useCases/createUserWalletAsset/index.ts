import { UsersWalletAssetsRepository } from '@modules/usersWalletAssets/repositories/implementations/usersWalletAssetsRepository';
import { CreateUserWalletAssetController } from './createUserWalletAssetController';
import { CreateUserWalletAssetUseCase } from './createUserWalletAssetUseCase';

const usersWalletAssetsRepository = new UsersWalletAssetsRepository();
const createUserWalletAssetUseCase = new CreateUserWalletAssetUseCase(
  usersWalletAssetsRepository,
);
const createUserWalletAssetController = new CreateUserWalletAssetController(
  createUserWalletAssetUseCase,
);

export { createUserWalletAssetController };
