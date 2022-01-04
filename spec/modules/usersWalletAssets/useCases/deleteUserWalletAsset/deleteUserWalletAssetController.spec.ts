import { Request, Response } from 'express';

import { mockResponse } from '@utils/mockResponse';
import { mockRequest } from '@utils/mockRequest';

import { DeleteUserWalletAssetController } from '@modules/usersWalletAssets/useCases/deleteUserWalletAsset/deleteUserWalletAssetController';
import { DeleteUserWalletAssetUseCase } from '@modules/usersWalletAssets/useCases/deleteUserWalletAsset/deleteUserWalletAssetUseCase';

jest.mock(
  '@modules/usersWalletAssets/useCases/deleteUserWalletAsset/deleteUserWalletAssetUseCase',
);

const DeleteUserWalletAssetUseCaseMock =
  DeleteUserWalletAssetUseCase as jest.Mock<DeleteUserWalletAssetUseCase>;
const deleteUserWalletAssetUseCaseMock =
  new DeleteUserWalletAssetUseCaseMock() as jest.Mocked<DeleteUserWalletAssetUseCase>;
const deleteUserWalletAssetController = new DeleteUserWalletAssetController(
  deleteUserWalletAssetUseCaseMock,
);

describe('DeleteUserWalletAssetController', () => {
  const request = mockRequest({ params: { id: 123 } });
  const response = mockResponse();

  it('should return the expected result', async () => {
    await deleteUserWalletAssetController.handle(
      request as Request,
      response as Response,
    );

    expect(response.sendStatus).toHaveBeenCalledWith(200);
    expect(deleteUserWalletAssetUseCaseMock.execute).toHaveBeenCalledTimes(1);
  });
});
