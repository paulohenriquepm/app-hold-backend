import { Request, Response } from 'express';

import { mockResponse } from '@utils/mockResponse';
import { mockRequest } from '@utils/mockRequest';

import { ListUserWalletAssetsController } from '@modules/usersWalletAssets/useCases/listUserWalletAssets/listUserWalletAssetsController';
import { ListUserWalletAssetsUseCase } from '@modules/usersWalletAssets/useCases/listUserWalletAssets/listUserWalletAssetsUseCase';

jest.mock(
  '@modules/usersWalletAssets/useCases/listUserWalletAssets/listUserWalletAssetsUseCase',
);

const ListUserWalletAssetsUseCaseMock =
  ListUserWalletAssetsUseCase as jest.Mock<ListUserWalletAssetsUseCase>;
const listUserWalletAssetsUseCaseMock =
  new ListUserWalletAssetsUseCaseMock() as jest.Mocked<ListUserWalletAssetsUseCase>;
const listUserWalletAssetsController = new ListUserWalletAssetsController(
  listUserWalletAssetsUseCaseMock,
);

describe('ListUserWalletAssetsController', () => {
  const request = mockRequest({ params: { user_wallet_id: 123 } });
  const response = mockResponse();

  it('should return the expected result', async () => {
    await listUserWalletAssetsController.handle(
      request as Request,
      response as Response,
    );

    expect(response.status).toHaveBeenCalledWith(201);
    expect(listUserWalletAssetsUseCaseMock.execute).toHaveBeenCalledTimes(1);
  });
});
