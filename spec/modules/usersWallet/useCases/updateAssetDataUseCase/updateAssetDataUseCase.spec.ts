import { AppError } from '@shared/errors/AppError';

import { UpdateAssetDataUseCase } from '@modules/assetsData/useCases/updateAssetDataUseCase/updateAssetDataUseCase';
import { AssetsDataRepository } from '@modules/assetsData/repositories/implementations/assetsDataRepository';
import { AssetDataFactory } from '@factories/assetDataFactory';
import { AssetFactory } from '@factories/assetFactory';
import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';

let assetDataRepository: AssetsDataRepository;
let assetRepository: AssetsRepository;

let assetFactory: AssetFactory;
let assetDataFactory: AssetDataFactory;

let updateAssetDataUseCase: UpdateAssetDataUseCase;

describe('UpdateAssetDataUseCase', () => {
  beforeEach(() => {
    assetRepository = new AssetsRepository();
    assetDataRepository = new AssetsDataRepository();

    assetFactory = new AssetFactory(assetRepository);
    assetDataFactory = new AssetDataFactory(assetDataRepository);

    updateAssetDataUseCase = new UpdateAssetDataUseCase(assetDataRepository);
  });

  describe('when assetData exits', () => {
    it('should update the assetData', async () => {
      const createdAsset = await assetFactory.create({
        name: 'old-name',
      });

      const assetData = await assetDataFactory.create({
        assetId: createdAsset.id,
        ebit: 1000,
      });

      const updatedAssetData = await updateAssetDataUseCase.execute(
        assetData.id,
        {
          ebit: 2000,
        },
      );

      expect(updatedAssetData.ebit).toBe(2000);
    });
  });

  describe('when assetData does not exists', () => {
    it('should create a new asset data', async () => {
      await expect(
        updateAssetDataUseCase.execute(123, { ebit: 2000 }),
      ).rejects.toEqual(new AppError(`Não existe nenhum dado com o id: 123`));
    });
  });
});
