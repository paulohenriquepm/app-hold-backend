import { Request, Response } from 'express';

import { mockResponse } from '@utils/mockResponse';
import { mockRequest } from '@utils/mockRequest';

import { UpdateUserWalletAssetQuantityController } from '@modules/usersWalletAssets/useCases/updateUserWalletAssetQuantity/updateUserWalletAssetQuantityController';
import { UpdateUserWalletAssetQuantityUseCase } from '@modules/usersWalletAssets/useCases/updateUserWalletAssetQuantity/updateUserWalletAssetQuantityUseCase';

jest.mock(
  '@modules/usersWalletAssets/useCases/updateUserWalletAssetQuantity/updateUserWalletAssetQuantityUseCase',
);

const UpdateUserWalletAssetQuantityUseCaseMock =
  UpdateUserWalletAssetQuantityUseCase as jest.Mock<UpdateUserWalletAssetQuantityUseCase>;
const updateUserWalletAssetQuantityUseCaseMock =
  new UpdateUserWalletAssetQuantityUseCaseMock() as jest.Mocked<UpdateUserWalletAssetQuantityUseCase>;
const deleteUserWalletAssetController =
  new UpdateUserWalletAssetQuantityController(
    updateUserWalletAssetQuantityUseCaseMock,
  );

describe('UpdateUserWalletAssetQuantityController', () => {
  const request = mockRequest({
    body: { quantity: 2 },
    params: { user_wallet_asset_id: 123 },
  });
  const response = mockResponse();

  it('should return the expected result', async () => {
    await deleteUserWalletAssetController.handle(
      request as Request,
      response as Response,
    );

    expect(
      updateUserWalletAssetQuantityUseCaseMock.execute,
    ).toHaveBeenCalledTimes(1);
  });
});
