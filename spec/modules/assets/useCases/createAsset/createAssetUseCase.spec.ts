import { AppError } from '@shared/errors/AppError';

import { AssetFactory } from '@factories/assetFactory';

import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';
import { CreateAssetUseCase } from '@modules/assets/useCases/createAsset/createAssetUseCase';

let assetRepository: AssetsRepository;
let assetFactory: AssetFactory;

let createAssetUseCase: CreateAssetUseCase;

describe('CreateAssetUseCase', () => {
  beforeEach(() => {
    assetRepository = new AssetsRepository();

    assetFactory = new AssetFactory(assetRepository);

    createAssetUseCase = new CreateAssetUseCase(assetRepository);
  });

  it('should create a new asset', async () => {
    const assetData = assetFactory.build();

    const createdAsset = await createAssetUseCase.execute(assetData);

    expect(createdAsset).toHaveProperty('id');
  });

  it('should return the createdAsset when trying to create a new asset with duplicated b3_ticket', async () => {
    const createdAssetFactory = await assetFactory.create({
      b3_ticket: 'WEGE3',
    });

    const assetdata = assetFactory.build({
      b3_ticket: 'WEGE3',
    });

    const createdAsset = await createAssetUseCase.execute(assetdata);

    expect(createdAsset).toEqual(createdAssetFactory);
  });
});
