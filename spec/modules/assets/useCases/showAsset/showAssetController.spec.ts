import { Request, Response } from 'express';

import { mockResponse } from '@spec-utils/mockResponse';
import { mockRequest } from '@spec-utils/mockRequest';

import { AssetFactory } from '@factories/assetFactory';
import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';
import { ShowAssetController } from '@modules/assets/useCases/showAsset/showAssetController';
import { ShowAssetUseCase } from '@modules/assets/useCases/showAsset/showAssetUseCase';
import { AppError } from '@shared/errors/AppError';

jest.mock('@modules/assets/useCases/showAsset/showAssetUseCase');

const ShowAssetUseCaseMock = ShowAssetUseCase as jest.Mock<ShowAssetUseCase>;
const showAssetUseCaseMock =
  new ShowAssetUseCaseMock() as jest.Mocked<ShowAssetUseCase>;
const showAssetController = new ShowAssetController(showAssetUseCaseMock);

const request = mockRequest({ params: { id: 1 } });
const response = mockResponse();

const assetsRepository = new AssetsRepository();
const assetFactory = new AssetFactory(assetsRepository);

describe('ShowAssetController', () => {
  describe('when asset exists with given id', () => {
    it('should return the expected result', async () => {
      const expectedResult = assetFactory.build();

      showAssetUseCaseMock.execute.mockReturnValueOnce(
        Promise.resolve(expectedResult),
      );

      await showAssetController.handle(
        request as Request,
        response as Response,
      );

      expect(response.json).toHaveBeenCalledWith(expectedResult);
      expect(showAssetUseCaseMock.execute).toHaveBeenCalledTimes(1);
    });
  });

  describe('when asset does not exist with given id', () => {
    it('should raise an AppError', async () => {
      showAssetUseCaseMock.execute.mockRejectedValueOnce(
        new AppError('Não existe nenhum ativo com o id: 1'),
      );

      await expect(
        showAssetController.handle(request as Request, response as Response),
      ).rejects.toEqual(new AppError('Não existe nenhum ativo com o id: 1'));
    });
  });
});
