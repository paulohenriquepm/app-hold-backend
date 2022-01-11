import { Request, Response } from 'express';

import { mockResponse } from '@spec-utils/mockResponse';
import { mockRequest } from '@spec-utils/mockRequest';

import { CreateUserWalletAssetController } from '@modules/usersWalletAssets/useCases/createUserWalletAsset/createUserWalletAssetController';
import { CreateUserWalletAssetUseCase } from '@modules/usersWalletAssets/useCases/createUserWalletAsset/createUserWalletAssetUseCase';
import { UsersWalletAssetsFactory } from '@factories/usersWalletAssetsFactory';
import { UsersWalletAssetsRepository } from '@modules/usersWalletAssets/repositories/implementations/usersWalletAssetsRepository';

jest.mock(
  '@modules/usersWalletAssets/useCases/createUserWalletAsset/createUserWalletAssetUseCase',
);

const CreateUsersWalletAssetsUseCaseMock =
  CreateUserWalletAssetUseCase as jest.Mock<CreateUserWalletAssetUseCase>;
const createUserWalletAssetUseCaseMock =
  new CreateUsersWalletAssetsUseCaseMock() as jest.Mocked<CreateUserWalletAssetUseCase>;
const createUserWalletAssetController = new CreateUserWalletAssetController(
  createUserWalletAssetUseCaseMock,
);

const request = mockRequest({});
const response = mockResponse();

const usersWalletAssetsRepository = new UsersWalletAssetsRepository();
const usersWalletAssetsFactory = new UsersWalletAssetsFactory(
  usersWalletAssetsRepository,
);

describe('CreateUserWalletAssetController', () => {
  it('should return the expected result', async () => {
    const expectedResult = usersWalletAssetsFactory.build();

    createUserWalletAssetUseCaseMock.execute.mockReturnValueOnce(
      Promise.resolve(expectedResult),
    );

    await createUserWalletAssetController.handle(
      request as Request,
      response as Response,
    );

    expect(response.json).toHaveBeenCalledWith(expectedResult);
    expect(createUserWalletAssetUseCaseMock.execute).toHaveBeenCalledTimes(1);
  });
});
