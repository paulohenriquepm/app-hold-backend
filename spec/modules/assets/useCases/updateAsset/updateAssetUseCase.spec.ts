import { AppError } from '@shared/errors/AppError';

import { AssetFactory } from '@factories/assetFactory';

import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';
import { UpdateAssetUseCase } from '@modules/assets/useCases/updateAsset/updateAssetUseCase';

let assetRepository: AssetsRepository;
let assetFactory: AssetFactory;

let updateAssetUseCase: UpdateAssetUseCase;

describe('UpdateAssetUseCase', () => {
  beforeEach(() => {
    assetRepository = new AssetsRepository();

    assetFactory = new AssetFactory(assetRepository);

    updateAssetUseCase = new UpdateAssetUseCase(assetRepository);
  });

  describe('when assets exits', () => {
    it('should update the assets', async () => {
      const createdAsset = await assetFactory.create({
        name: 'old-name',
      });

      const upatedAsset = await updateAssetUseCase.execute(createdAsset.id, {
        name: 'updated-name',
      });

      expect(upatedAsset.name).toBe('updated-name');
    });
  });

  describe('when assets does not exit', () => {
    it('should raise an AppError', async () => {
      await expect(
        updateAssetUseCase.execute(123, {
          name: 'updated-name',
        }),
      ).rejects.toEqual(new AppError('Não existe nenhum ativo com o id: 123'));
    });
  });
});
