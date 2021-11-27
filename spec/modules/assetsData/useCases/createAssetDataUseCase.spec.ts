import { AppError } from '@shared/errors/AppError';

import { AssetFactory } from '@factories/assetFactory';

import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';
import { CreateAssetDataUseCase } from '@modules/assetsData/useCases/createAssetData/createAssetDataUseCase';
import { AssetsDataRepository } from '@modules/assetsData/repositories/implementations/assetsDataRepository';
import { AssetDataFactory } from '@factories/assetDataFactory';

let assetsRepository: AssetsRepository;
let assetsDataRepository: AssetsDataRepository;

let assetFactory: AssetFactory;
let assetDataFactory: AssetDataFactory;

let createAssetDataUseCase: CreateAssetDataUseCase;

describe('CreateAssetDataUseCase', () => {
  beforeEach(() => {
    assetsRepository = new AssetsRepository();
    assetsDataRepository = new AssetsDataRepository();

    assetFactory = new AssetFactory(assetsRepository);
    assetDataFactory = new AssetDataFactory(assetsDataRepository);

    createAssetDataUseCase = new CreateAssetDataUseCase(assetsDataRepository);
  });

  describe('when asset data does not exists with given assetId, year and quarter', () => {
    it('should create a new asset data', async () => {
      const asset = await assetFactory.create();

      const year = 2021;
      const quarter = 1;

      const assetData = assetDataFactory.build({
        assetId: asset.id,
        year,
        quarter,
      });

      const createdAssetData = await createAssetDataUseCase.execute(assetData);

      expect(createdAssetData).toHaveProperty('id');
    });
  });

  describe('when already exists a asset data with given assetId, year and quarter', () => {
    it('should return null', async () => {
      const asset = await assetFactory.create();

      const year = 2021;
      const quarter = 1;

      await assetDataFactory.create({
        assetId: asset.id,
        year,
        quarter,
      });

      const assetData = assetDataFactory.build({
        assetId: asset.id,
        year,
        quarter,
      });

      expect(await createAssetDataUseCase.execute(assetData)).toBeNull;
    });
  });
});
