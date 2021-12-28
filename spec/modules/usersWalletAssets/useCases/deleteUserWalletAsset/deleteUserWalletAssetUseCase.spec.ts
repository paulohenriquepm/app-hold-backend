import { FakeUsersWalletAssetsRepository } from '@modules/usersWalletAssets/repositories/fakes/fakeUsersWalletAssetsRepository';
import { DeleteUserWalletAssetUseCase } from '@modules/usersWalletAssets/useCases/deleteUserWalletAsset/deleteUserWalletAssetUseCase';

let fakeUsersWalletAssetsRepository: FakeUsersWalletAssetsRepository;
let deleteUserWalletAssetUseCase: DeleteUserWalletAssetUseCase;

describe('deleteUserWalletAssetUseCase', () => {
  beforeEach(() => {
    fakeUsersWalletAssetsRepository = new FakeUsersWalletAssetsRepository();

    deleteUserWalletAssetUseCase = new DeleteUserWalletAssetUseCase(
      fakeUsersWalletAssetsRepository,
    );
  });

  it('should be able to delete a user wallet asset', async () => {
    const createdUserWalletAsset = await fakeUsersWalletAssetsRepository.create(
      {
        assetId: 1,
        quantity: 1,
        userWalletId: 1,
      },
    );

    await deleteUserWalletAssetUseCase.execute(createdUserWalletAsset.id);

    const foundUserWalletAsset = await fakeUsersWalletAssetsRepository.findById(
      createdUserWalletAsset.id,
    );

    expect(foundUserWalletAsset).toBeNull;
  });
});
