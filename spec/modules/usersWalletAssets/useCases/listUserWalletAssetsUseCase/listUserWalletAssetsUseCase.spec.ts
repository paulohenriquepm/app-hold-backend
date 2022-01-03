import { FakeUsersWalletAssetsRepository } from '@modules/usersWalletAssets/repositories/fakes/fakeUsersWalletAssetsRepository';
import { ListUserWalletAssetsUseCase } from '@modules/usersWalletAssets/useCases/listUserWalletAssets/listUserWalletAssetsUseCase';

let fakeUsersWalletAssetsRepository: FakeUsersWalletAssetsRepository;
let listUserWalletAssetsUseCase: ListUserWalletAssetsUseCase;

describe('listUserWalletAssetsUseCase', () => {
  beforeEach(() => {
    fakeUsersWalletAssetsRepository = new FakeUsersWalletAssetsRepository();

    listUserWalletAssetsUseCase = new ListUserWalletAssetsUseCase(
      fakeUsersWalletAssetsRepository,
    );
  });

  describe('when exists assets with given user_wallet_id', () => {
    it('should return the assets from user wallet', async () => {
      const userWalletId = 1;

      const userWalletAssetsData = [
        {
          id: 1,
          assetId: 1,
          quantity: 1,
          userWalletId,
        },
        {
          id: 2,
          assetId: 2,
          quantity: 1,
          userWalletId,
        },
      ];

      await fakeUsersWalletAssetsRepository.createMany([
        ...userWalletAssetsData,
        {
          assetId: 3,
          quantity: 1,
          userWalletId: 2,
        },
      ]);

      const userWalletAssets =
        await fakeUsersWalletAssetsRepository.listByUserWalletId(userWalletId);

      expect(userWalletAssets).toEqual(userWalletAssetsData);
    });
  });

  describe('when doest not exist assets with given user_wallet_id', () => {
    it('should return empty', async () => {
      const userWalletId = 1;

      await fakeUsersWalletAssetsRepository.createMany([
        {
          assetId: 1,
          quantity: 1,
          userWalletId: 2,
        },
      ]);

      const userWalletAssets =
        await fakeUsersWalletAssetsRepository.listByUserWalletId(userWalletId);

      expect(userWalletAssets).toEqual([]);
    });
  });
});
