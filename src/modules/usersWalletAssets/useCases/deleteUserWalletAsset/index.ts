import { UsersWalletAssetsRepository } from '@modules/usersWalletAssets/repositories/implementations/usersWalletAssetsRepository';
import { DeleteUserWalletAssetController } from './deleteUserWalletAssetController';
import { DeleteUserWalletAssetUseCase } from './deleteUserWalletAssetUseCase';

const usersWalletAssetsRepository = new UsersWalletAssetsRepository();
const deleteUserWalletAssetUseCase = new DeleteUserWalletAssetUseCase(
  usersWalletAssetsRepository,
);
const deleteUserWalletAssetController = new DeleteUserWalletAssetController(
  deleteUserWalletAssetUseCase,
);

export { deleteUserWalletAssetController };
