import { AssetFactory } from '@factories/assetFactory';
import { UserFactory } from '@factories/userFactory';
import { UsersWalletAssetsFactory } from '@factories/usersWalletAssetsFactory';
import { UsersWalletFactory } from '@factories/usersWalletFactory';

import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';
import { UsersRepository } from '@modules/users/repositories/implementations/usersRepository';
import { UsersWalletRepository } from '@modules/usersWallet/repositories/implementations/UsersWalletRepository';
import { UsersWalletAssetsRepository } from '@modules/usersWalletAssets/repositories/implementations/usersWalletAssetsRepository';

import { CreateUserWalletAssetUseCase } from '@modules/usersWalletAssets/useCases/createUserWalletAsset/createUserWalletAssetUseCase';

let assetsRepository: AssetsRepository;
let usersRepository: UsersRepository;
let usersWalletRepository: UsersWalletRepository;
let usersWalletAssetsRepository: UsersWalletAssetsRepository;

let assetFactory: AssetFactory;
let userFactory: UserFactory;
let userWalletFactory: UsersWalletFactory;
let usersWalletAssetsFactory: UsersWalletAssetsFactory;

let createUserWalletAssetUseCase: CreateUserWalletAssetUseCase;

describe('createUserWalletAssetUseCase', () => {
  beforeEach(() => {
    assetsRepository = new AssetsRepository();
    usersRepository = new UsersRepository();
    usersWalletAssetsRepository = new UsersWalletAssetsRepository();
    usersWalletRepository = new UsersWalletRepository();

    assetFactory = new AssetFactory(assetsRepository);
    userFactory = new UserFactory(usersRepository);
    userWalletFactory = new UsersWalletFactory(usersWalletRepository);
    usersWalletAssetsFactory = new UsersWalletAssetsFactory(
      usersWalletAssetsRepository,
    );

    createUserWalletAssetUseCase = new CreateUserWalletAssetUseCase(
      usersWalletAssetsRepository,
    );
  });

  it('should update the asset quantity if the asset is already included', async () => {
    const user = await userFactory.create();
    const userWallet = await userWalletFactory.create(user.id);
    const asset = await assetFactory.create({ b3_ticket: 'WEGE3' });
    const createdWalletAsset = await usersWalletAssetsFactory.create({
      assetId: asset.id,
      quantity: 1,
      userWalletId: userWallet.id,
    });

    const userWalletAssetsBefore =
      await usersWalletAssetsRepository.listByUserWalletId(userWallet.id);

    await createUserWalletAssetUseCase.execute({
      assetId: asset.id,
      quantity: 1,
      userWalletId: userWallet.id,
    });

    const userWalletAssetsAfter =
      await usersWalletAssetsRepository.listByUserWalletId(userWallet.id);
    const updatedWalletAsset = await usersWalletAssetsRepository.findById(
      createdWalletAsset.id,
    );

    expect(userWalletAssetsBefore.length).toEqual(userWalletAssetsAfter.length);
    expect(updatedWalletAsset.id).toEqual(createdWalletAsset.id);
    expect(updatedWalletAsset.quantity).toEqual(
      createdWalletAsset.quantity + 1,
    );
  });

  it('should be able to create a new user wallet asset', async () => {
    const user = await userFactory.create();
    const userWallet = await userWalletFactory.create(user.id);
    const asset = await assetFactory.create({ b3_ticket: 'WEGE3' });

    const data = {
      userWalletId: userWallet.id,
      assetId: asset.id,
      quantity: 1,
    };

    const createdUserWalletAsset = await createUserWalletAssetUseCase.execute(
      data,
    );

    expect(createdUserWalletAsset).toHaveProperty('id');
  });
});
