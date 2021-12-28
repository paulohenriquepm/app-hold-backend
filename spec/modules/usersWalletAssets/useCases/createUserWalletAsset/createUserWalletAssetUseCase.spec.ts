import { FakeUsersWalletAssetsRepository } from '@modules/usersWalletAssets/repositories/fakes/fakeUsersWalletAssetsRepository';
import { CreateUserWalletAssetUseCase } from '@modules/usersWalletAssets/useCases/createUserWalletAsset/createUserWalletAssetUseCase';

let fakeUsersWalletAssetsRepository: FakeUsersWalletAssetsRepository;

let createUserWalletAssetUseCase: CreateUserWalletAssetUseCase;

describe('createUserWalletAssetUseCase', () => {
  beforeEach(() => {
    fakeUsersWalletAssetsRepository = new FakeUsersWalletAssetsRepository();

    createUserWalletAssetUseCase = new CreateUserWalletAssetUseCase(
      fakeUsersWalletAssetsRepository,
    );
  });

  it('should be able to create a new user wallet asset', async () => {
    const data = {
      userWalletId: 1,
      assetId: 1,
      quantity: 1,
    };

    const createdUserWalletAsset = await createUserWalletAssetUseCase.execute(
      data,
    );

    expect(createdUserWalletAsset).toHaveProperty('id');
  });
});
