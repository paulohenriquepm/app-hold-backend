import { AssetFactory } from '@factories/assetFactory';

import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';
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
      const assets = await listAssetsUseCase.execute('');

      expect(assets.length).toBe(countAssets);
    });

    it('should return the asset with given name', async () => {
      await assetFactory.create({ name: 'Weg' });

      const asset = await listAssetsUseCase.execute('Weg');

      expect(asset[0].name).toBe('Weg');
    });

    it('should return the asset with given ticket', async () => {
      await assetFactory.create({ b3_ticket: 'WEGE3' });

      const asset = await listAssetsUseCase.execute('WEGE3');

      expect(asset[0].b3_ticket).toBe('WEGE3');
    });
  });

  describe('when assets does not exists', () => {
    it('should return a list of assets', async () => {
      const assets = await listAssetsUseCase.execute('');

      expect(assets.length).toBe(0);
    });
  });
});
