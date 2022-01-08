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
      const assets = await listAssetsUseCase.execute({
        nameOrTicket: '',
        sector: '',
      });

      expect(assets.length).toBe(countAssets);
    });

    it('should return the asset with given name', async () => {
      await assetFactory.create({ name: 'Weg' });
      await assetFactory.create({ name: 'Ambev' });

      const asset = await listAssetsUseCase.execute({
        nameOrTicket: 'Weg',
        sector: '',
      });

      expect(asset[0].name).toBe('Weg');
    });

    it('should return the asset with given ticket', async () => {
      await assetFactory.create({ b3_ticket: 'WEGE3' });
      await assetFactory.create({ b3_ticket: 'AMBEV3' });

      const asset = await listAssetsUseCase.execute({
        nameOrTicket: 'WEGE3',
        sector: '',
      });

      expect(asset[0].b3_ticket).toBe('WEGE3');
    });

    it('should return the asset with given sector', async () => {
      await assetFactory.create({ name: 'Apple', sector: 'Technology' });
      await assetFactory.create({ name: 'Itaú', sector: 'Financial' });

      const asset = await listAssetsUseCase.execute({
        nameOrTicket: '',
        sector: 'Technology',
      });

      expect(asset[0].name).toBe('Apple');
      expect(asset[0].sector).toBe('Technology');
    });
  });

  describe('when assets does not exists', () => {
    it('should return a list of assets', async () => {
      const assets = await listAssetsUseCase.execute({
        nameOrTicket: '',
        sector: '',
      });

      expect(assets.length).toBe(0);
    });
  });
});
