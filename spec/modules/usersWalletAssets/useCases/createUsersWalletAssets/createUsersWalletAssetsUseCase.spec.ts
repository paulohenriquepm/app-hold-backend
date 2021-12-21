import { AppError } from '@shared/errors/AppError';

import { UserFactory } from '@factories/userFactory';
import { UsersWalletFactory } from '@factories/usersWalletFactory';

import { FakeUsersRepository } from '@modules/users/repositories/fakes/fakeUsersRepository';
import { FakeUsersWalletRepository } from '@modules/usersWallet/repositories/fakes/fakeUsersWalletRepository';
import { FakeUsersWalletAssetsRepository } from '@modules/usersWalletAssets/repositories/fakes/fakeUsersWalletAssetsRepository';
import { CreateUsersWalletAssetsUseCase } from '@modules/usersWalletAssets/useCases/createUsersWalletAssets/createUsersWalletAssetsUseCase';

let fakeUsersWalletAssetsRepository: FakeUsersWalletAssetsRepository;

let createUsersWalletAssetsUseCase: CreateUsersWalletAssetsUseCase;

let userFactory: UserFactory;
let usersWalletFactory: UsersWalletFactory;

describe('createUsersWalletAssetsUseCase', () => {
  beforeEach(() => {
    fakeUsersWalletAssetsRepository = new FakeUsersWalletAssetsRepository();

    createUsersWalletAssetsUseCase = new CreateUsersWalletAssetsUseCase(
      fakeUsersWalletAssetsRepository,
    );
  });

  it('should be able to create a new user wallet asset', async () => {
    const data = {
      userWalletId: 1,
      assetId: 1,
      quantity: 1,
    };

    const createdUserWalletAsset = await createUsersWalletAssetsUseCase.execute(
      data,
    );

    expect(createdUserWalletAsset).toHaveProperty('id');
  });
});
