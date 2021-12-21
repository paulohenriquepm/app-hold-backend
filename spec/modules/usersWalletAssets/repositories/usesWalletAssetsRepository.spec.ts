import { AppError } from '@shared/errors/AppError';

import { UsersWalletAssetsFactory } from '@factories/usersWalletAssetsFactory';
import { AssetFactory } from '@factories/assetFactory';
import { UserFactory } from '@factories/userFactory';
import { UsersWalletFactory } from '@factories/usersWalletFactory';

import { UsersWalletAssetsRepository } from '@modules/usersWalletAssets/repositories/implementations/usersWalletAssetsRepository';
import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';
import { UsersRepository } from '@modules/users/repositories/implementations/usersRepository';
import { UsersWalletRepository } from '@modules/usersWallet/repositories/implementations/UsersWalletRepository';

let usersWalletAssetsRepository: UsersWalletAssetsRepository;
let assetsRepository: AssetsRepository;
let usersRepository: UsersRepository;
let usersWalletRepository: UsersWalletRepository;

let usersWalletAssetsFactory: UsersWalletAssetsFactory;
let assetFactory: AssetFactory;
let userFactory: UserFactory;
let usersWalletFactory: UsersWalletFactory;

describe('UsersWalletAssetsRepository', () => {
  beforeEach(() => {
    usersWalletAssetsRepository = new UsersWalletAssetsRepository();
    assetsRepository = new AssetsRepository();
    usersRepository = new UsersRepository();
    usersWalletRepository = new UsersWalletRepository();

    usersWalletAssetsFactory = new UsersWalletAssetsFactory(
      usersWalletAssetsRepository,
    );
    assetFactory = new AssetFactory(assetsRepository);
    userFactory = new UserFactory(usersRepository);
    usersWalletFactory = new UsersWalletFactory(usersWalletRepository);
  });

  describe('create', () => {
    it('should create a new user wallet asset data', async () => {
      const createdAsset = await assetFactory.create();
      const createdUser = await userFactory.create();
      const createdUserWallet = await usersWalletFactory.create(createdUser.id);

      const createdUserWalletAssetData = await usersWalletAssetsFactory.create({
        assetId: createdAsset.id,
        userWalletId: createdUserWallet.id,
      });

      expect(createdUserWalletAssetData).toHaveProperty('id');
    });
  });
});
