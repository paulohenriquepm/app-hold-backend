import { UsersWalletAssetsRepository } from '@modules/usersWalletAssets/repositories/implementations/usersWalletAssetsRepository';
import { CreateUsersWalletAssetsController } from './createUsersWalletAssetsController';
import { CreateUsersWalletAssetsUseCase } from './createUsersWalletAssetsUseCase';

const usersWalletAssetsRepository = new UsersWalletAssetsRepository();
const createUsersWalletAssetsUseCase = new CreateUsersWalletAssetsUseCase(usersWalletAssetsRepository);
const createUsersWalletAssetsController = new CreateUsersWalletAssetsController(
  createUsersWalletAssetsUseCase,
);

export { createUsersWalletAssetsController };
