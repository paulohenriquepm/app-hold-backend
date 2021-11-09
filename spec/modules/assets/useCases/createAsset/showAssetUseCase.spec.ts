import { AppError } from '@shared/errors/AppError';

import { AssetFactory } from '@factories/assetFactory';

import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';
import { ShowAssetUseCase } from '@modules/assets/useCases/showAsset/showAssetUseCase';

let assetsRepository: AssetsRepository;
let assetFactory: AssetFactory;

let showAssetUseCase: ShowAssetUseCase;

describe('ShowAssetUseCase', () => {
  beforeEach(() => {
    assetsRepository = new AssetsRepository();

    assetFactory = new AssetFactory(assetsRepository);

    showAssetUseCase = new ShowAssetUseCase(assetsRepository);
  });

  describe('when asset exists with given id', () => {
    it('should return the asset', async () => {
      const createdAsset = await assetFactory.create();

      const foundAsset = await showAssetUseCase.execute(createdAsset.id);

      expect(foundAsset.id).toBe(createdAsset.id);
    });
  });

  describe('when asset does not exist with given b3_ticket', () => {
    it('should return null', async () => {
      await expect(showAssetUseCase.execute(123)).rejects.toEqual(
        new AppError('Não existe nenhum ativo com o id: 123'),
      );
    });
  });
});
