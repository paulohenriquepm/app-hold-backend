import { Request, Response } from 'express';

import { mockResponse } from '@utils/mockResponse';
import { mockRequest } from '@utils/mockRequest';

import { ListAssetsUseCase } from '@modules/assets/useCases/listAssets/listAssetsUseCase';
import { ListAssetsController } from '@modules/assets/useCases/listAssets/listAssetsController';
import { AssetFactory } from '@factories/assetFactory';
import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';

jest.mock('@modules/assets/useCases/listAssets/listAssetsUseCase');

const ListAssetsUseCaseMock = ListAssetsUseCase as jest.Mock<ListAssetsUseCase>;
const listAssetsUseCaseMock =
  new ListAssetsUseCaseMock() as jest.Mocked<ListAssetsUseCase>;
const listAssetsController = new ListAssetsController(listAssetsUseCaseMock);

const request = mockRequest({ query: { includeAssetData: 'true' } });
const response = mockResponse();

const assetsRepository = new AssetsRepository();
const assetFactory = new AssetFactory(assetsRepository);

describe('ListAssetsController', () => {
  it('should return the expected result', async () => {
    const expectedResult = [assetFactory.build(), assetFactory.build()];

    listAssetsUseCaseMock.execute.mockReturnValueOnce(
      Promise.resolve(expectedResult),
    );

    await listAssetsController.handle(request as Request, response as Response);

    expect(response.json).toHaveBeenCalledWith(expectedResult);
    expect(listAssetsUseCaseMock.execute).toHaveBeenCalledTimes(1);
  });
});
