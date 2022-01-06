import { AppError } from '@shared/errors/AppError';

import { UsersWalletAssetsFactory } from '@factories/usersWalletAssetsFactory';
import { AssetFactory } from '@factories/assetFactory';
import { UserFactory } from '@factories/userFactory';
import { UsersWalletFactory } from '@factories/usersWalletFactory';

import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';
import { UsersRepository } from '@modules/users/repositories/implementations/usersRepository';
import { UsersWalletRepository } from '@modules/usersWallet/repositories/implementations/UsersWalletRepository';
import { UsersWalletAssetsRepository } from '@modules/usersWalletAssets/repositories/implementations/usersWalletAssetsRepository';

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

  describe('listByUserWalletId', () => {
    it('should return the list of assets when exists', async () => {
      const createdAsset = await assetFactory.create();
      const createdUser = await userFactory.create();
      const createdUserWallet = await usersWalletFactory.create(createdUser.id);
      await usersWalletAssetsFactory.createMany(
        {
          userWalletId: createdUserWallet.id,
          assetId: createdAsset.id,
        },
        2,
      );

      const userWalletAssets =
        await usersWalletAssetsRepository.listByUserWalletId(
          createdUserWallet.id,
        );

      expect(userWalletAssets.length).toEqual(2);
    });

    it('should return empty when assets does not exists', async () => {
      const userWalletAssets =
        await usersWalletAssetsRepository.listByUserWalletId(123);

      expect(userWalletAssets.length).toEqual(0);
    });
  });

  describe('findById', () => {
    it('should return the asset when exists', async () => {
      const createdAsset = await assetFactory.create();
      const createdUser = await userFactory.create();
      const createdUserWallet = await usersWalletFactory.create(createdUser.id);
      const createdUserWalletAsset = await usersWalletAssetsFactory.create({
        assetId: createdAsset.id,
        userWalletId: createdUserWallet.id,
      });

      const foundUserWalletAsset = await usersWalletAssetsRepository.findById(
        createdUserWalletAsset.id,
      );

      expect(foundUserWalletAsset).toHaveProperty('id');
    });

    it('should return null when asset does not exists', async () => {
      const foundUserWalletAsset = await usersWalletAssetsRepository.findById(
        123,
      );

      expect(foundUserWalletAsset).toBeNull;
    });
  });

  describe('create', () => {
    it('should create a new user wallet asset data', async () => {
      const createdAsset = await assetFactory.create();
      const createdUser = await userFactory.create();
      const createdUserWallet = await usersWalletFactory.create(createdUser.id);

      const createdUserWalletAsset = await usersWalletAssetsRepository.create({
        assetId: createdAsset.id,
        userWalletId: createdUserWallet.id,
        quantity: 1,
      });

      expect(createdUserWalletAsset).toHaveProperty('id');
    });
  });

  describe('update', () => {
    describe('when assets exists with given id', () => {
      it('should update the asset', async () => {
        const createdAsset = await assetFactory.create();
        const createdUser = await userFactory.create();
        const createdUserWallet = await usersWalletFactory.create(
          createdUser.id,
        );
        const createdUserWalletAsset = await usersWalletAssetsFactory.create({
          assetId: createdAsset.id,
          userWalletId: createdUserWallet.id,
          quantity: 1,
        });

        const updatedUserWalletAsset = await usersWalletAssetsRepository.update(
          createdUserWalletAsset.id,
          {
            quantity: 2,
          },
        );

        expect(updatedUserWalletAsset.id).toEqual(createdUserWalletAsset.id);
        expect(updatedUserWalletAsset.quantity).toEqual(2);
      });
    });

    describe('when assets does not exist with given id', () => {
      it('should raise an AppError', async () => {
        await expect(
          usersWalletAssetsRepository.update(123, {
            quantity: 2,
          }),
        ).rejects.toEqual(
          new AppError('Não existe nenhum ativo com o id: 123'),
        );
      });
    });
  });

  describe('destroy', () => {
    it('should destroy the asset', async () => {
      const createdAsset = await assetFactory.create();
      const createdUser = await userFactory.create();
      const createdUserWallet = await usersWalletFactory.create(createdUser.id);
      const createdUserWalletAsset = await usersWalletAssetsFactory.create({
        assetId: createdAsset.id,
        userWalletId: createdUserWallet.id,
      });

      await usersWalletAssetsRepository.destroy(createdUserWalletAsset.id);
      const foundUserWalletAsset = await usersWalletAssetsRepository.findById(
        createdUserWalletAsset.id,
      );
      expect(foundUserWalletAsset).toBeNull;
    });
  });
});
