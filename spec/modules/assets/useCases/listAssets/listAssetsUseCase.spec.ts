import { AppError } from '@shared/errors/AppError';

import { AssetFactory } from '@factories/assetFactory';

import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';
import { ShowAssetUseCase } from '@modules/assets/useCases/showAsset/showAssetUseCase';
import { ListAssetsUseCase } from '@modules/assets/useCases/listAssets/listAssetsUseCase';

let assetsRepository: AssetsRepository;
let assetFactory: AssetFactory;

let listAssetsUseCase: ListAssetsUseCase;

describe('ListAssetsUseCase', () => {
  beforeEach(() => {
    assetsRepository = new AssetsRepository();

    assetFactory = new AssetFactory(assetsRepository);

    listAssetsUseCase = new ListAssetsUseCase(assetsRepository);
  });

  describe('when assets exists', () => {
    let countAssets = 3;

    beforeEach(async () => {
      await assetFactory.createMany({}, countAssets);
    });

    it('should return a list of assets', async () => {
      const assets = await listAssetsUseCase.execute();

      expect(assets.length).toBe(countAssets);
    });
  });

  describe('when assets does not exists', () => {
    it('should return a list of assets', async () => {
      const assets = await listAssetsUseCase.execute();

      expect(assets.length).toBe(0);
    });
  });
});
