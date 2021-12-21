import { Request, Response } from 'express';

import { mockResponse } from '@utils/mockResponse';
import { mockRequest } from '@utils/mockRequest';

import { CreateUsersWalletAssetsController } from '@modules/usersWalletAssets/useCases/createUsersWalletAssets/createUsersWalletAssetsController';
import { CreateUsersWalletAssetsUseCase } from '@modules/usersWalletAssets/useCases/createUsersWalletAssets/createUsersWalletAssetsUseCase';
import { UsersWalletAssetsFactory } from '@factories/usersWalletAssetsFactory';
import { UsersWalletAssetsRepository } from '@modules/usersWalletAssets/repositories/implementations/usersWalletAssetsRepository';

jest.mock(
  '@modules/usersWalletAssets/useCases/createUsersWalletAssets/createUsersWalletAssetsUseCase',
);

const CreateUsersWalletAssetsUseCaseMock =
  CreateUsersWalletAssetsUseCase as jest.Mock<CreateUsersWalletAssetsUseCase>;
const createUsersWalletAssetsUseCaseMock =
  new CreateUsersWalletAssetsUseCaseMock() as jest.Mocked<CreateUsersWalletAssetsUseCase>;
const createUsersWalletAssetsController = new CreateUsersWalletAssetsController(
  createUsersWalletAssetsUseCaseMock,
);

const request = mockRequest({ query: { includeAssetData: 'true' } });
const response = mockResponse();

const usersWalletAssetsRepository = new UsersWalletAssetsRepository();
const usersWalletAssetsFactory = new UsersWalletAssetsFactory(
  usersWalletAssetsRepository,
);

describe('CreateUsersWalletAssetsController', () => {
  it('should return the expected result', async () => {
    const expectedResult = usersWalletAssetsFactory.build();

    createUsersWalletAssetsUseCaseMock.execute.mockReturnValueOnce(
      Promise.resolve(expectedResult),
    );

    await createUsersWalletAssetsController.handle(
      request as Request,
      response as Response,
    );

    expect(response.json).toHaveBeenCalledWith(expectedResult);
    expect(createUsersWalletAssetsUseCaseMock.execute).toHaveBeenCalledTimes(1);
  });
});
