import { AppError } from '@shared/errors/AppError';

import { AssetFactory } from '@factories/assetFactory';
import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';
import { AssetsDataRepository } from '@modules/assetsData/repositories/implementations/assetsDataRepository';
import { AssetDataFactory } from '@factories/assetDataFactory';

let assetsRepository: AssetsRepository;
let assetsDataRepository: AssetsDataRepository;

let assetFactory: AssetFactory;
let assetDataFactory: AssetDataFactory;

describe('AssetsDataRepository', () => {
  beforeEach(() => {
    assetsRepository = new AssetsRepository();
    assetsDataRepository = new AssetsDataRepository();

    assetFactory = new AssetFactory(assetsRepository);
    assetDataFactory = new AssetDataFactory(assetsDataRepository);
  });

  describe('create', () => {
    it('should create a new asset data', async () => {
      const createdAsset = await assetFactory.create();

      const createdAssetData = await assetDataFactory.create({
        assetId: createdAsset.id,
      });

      expect(createdAssetData).toHaveProperty('id');
    });
  });

  describe('update', () => {
    describe('when assetData exists', () => {
      it('should create a new asset data', async () => {
        const createdAsset = await assetFactory.create();

        const assetData = await assetDataFactory.create({
          assetId: createdAsset.id,
          ebit: BigInt(1000),
        });

        const updatedAssetData = await assetsDataRepository.update(
          assetData.id,
          { ebit: BigInt(2000) },
        );

        expect(updatedAssetData.ebit).toBe(BigInt(2000));
      });
    });

    describe('when assetData does not exists', () => {
      it('should create a new asset data', async () => {
        await expect(
          assetsDataRepository.update(123, { ebit: BigInt(2000) }),
        ).rejects.toEqual(new AppError(`Não existe nenhum dado com o id: 123`));
      });
    });
  });

  describe('findByAssetId', () => {
    describe('when assetData exists with given asset id', () => {
      it('should return the asset', async () => {
        const createdAsset = await assetFactory.create();

        await assetDataFactory.create({
          assetId: createdAsset.id,
        });

        const foundAssetData = await assetsDataRepository.findByAssetId(
          createdAsset.id,
        );

        expect(foundAssetData.assetId).toBe(createdAsset.id);
      });
    });

    describe('when assetData does not exist with given asset id', () => {
      it('should return null', async () => {
        await expect(assetsDataRepository.findByAssetId(123)).rejects.toEqual(
          new AppError('Não existe nenhum dado para o ativo com o id: 123'),
        );
      });
    });
  });

  describe('findByAssetIdYear', () => {
    describe('when assetData exists with given asset id and year', () => {
      it('should return the assetData', async () => {
        const createdAsset = await assetFactory.create();

        const year = 2021;

        await assetDataFactory.create({
          assetId: createdAsset.id,
          year,
          quarter: null,
        });

        const foundAssetData = await assetsDataRepository.findByAssetIdYear(
          createdAsset.id,
          year,
        );

        expect(foundAssetData.assetId).toBe(createdAsset.id);
      });
    });

    describe('when assetData does not exist with given asset id, year and quarter', () => {
      it('should return the assetData', async () => {
        const createdAsset = await assetFactory.create();

        const year = 2021;

        await assetDataFactory.create({
          assetId: createdAsset.id,
          year,
        });

        const foundAssetData = await assetsDataRepository.findByAssetIdYear(
          createdAsset.id,
          2022,
        );

        expect(foundAssetData).toBeNull;
      });
    });
  });

  describe('findByAssetIdYearQuarter', () => {
    describe('when assetData exists with given asset id, year and quarter', () => {
      it('should return the assetData', async () => {
        const createdAsset = await assetFactory.create();

        const year = 2021;
        const quarter = 1;

        await assetDataFactory.create({
          assetId: createdAsset.id,
          year,
          quarter,
        });

        const foundAssetData =
          await assetsDataRepository.findByAssetIdYearQuarter(
            createdAsset.id,
            year,
            quarter,
          );

        expect(foundAssetData.assetId).toBe(createdAsset.id);
      });
    });

    describe('when assetData does not exist with given asset id, year and quarter', () => {
      it('should return the assetData', async () => {
        const createdAsset = await assetFactory.create();

        const year = 2021;
        const quarter = 1;

        await assetDataFactory.create({
          assetId: createdAsset.id,
          year,
          quarter,
        });

        const foundAssetData =
          await assetsDataRepository.findByAssetIdYearQuarter(
            createdAsset.id,
            year,
            2,
          );

        expect(foundAssetData).toBeNull;
      });
    });
  });
});
