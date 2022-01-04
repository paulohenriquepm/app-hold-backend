import { FakeUsersWalletAssetsRepository } from '@modules/usersWalletAssets/repositories/fakes/fakeUsersWalletAssetsRepository';
import { UpdateUserWalletAssetQuantityUseCase } from '@modules/usersWalletAssets/useCases/updateUserWalletAssetQuantity/updateUserWalletAssetQuantityUseCase';

let fakeUsersWalletAssetsRepository: FakeUsersWalletAssetsRepository;
let updateUserWalletAssetQuantityUseCase: UpdateUserWalletAssetQuantityUseCase;

describe('updateUserWalletAssetQuantityUseCase', () => {
  beforeEach(() => {
    fakeUsersWalletAssetsRepository = new FakeUsersWalletAssetsRepository();

    updateUserWalletAssetQuantityUseCase =
      new UpdateUserWalletAssetQuantityUseCase(fakeUsersWalletAssetsRepository);
  });

  it('should be able to delete a user wallet asset', async () => {
    const createdUserWalletAsset = await fakeUsersWalletAssetsRepository.create(
      {
        assetId: 1,
        quantity: 1,
        userWalletId: 1,
      },
    );

    const updatedUserWalletAsset =
      await updateUserWalletAssetQuantityUseCase.execute(
        createdUserWalletAsset.id,
        2,
      );

    expect(updatedUserWalletAsset.quantity).toEqual(2);
  });
});
