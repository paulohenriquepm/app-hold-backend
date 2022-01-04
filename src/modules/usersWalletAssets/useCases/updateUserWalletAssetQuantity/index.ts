import { UsersWalletAssetsRepository } from '@modules/usersWalletAssets/repositories/implementations/usersWalletAssetsRepository';
import { UpdateUserWalletAssetQuantityController } from './updateUserWalletAssetQuantityController';
import { UpdateUserWalletAssetQuantityUseCase } from './updateUserWalletAssetQuantityUseCase';

const usersWalletAssetsRepository = new UsersWalletAssetsRepository();
const updateUserWalletAssetQuantityUseCase =
  new UpdateUserWalletAssetQuantityUseCase(usersWalletAssetsRepository);
const updateUserWalletAssetQuantityController =
  new UpdateUserWalletAssetQuantityController(
    updateUserWalletAssetQuantityUseCase,
  );

export { updateUserWalletAssetQuantityController };
