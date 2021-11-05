import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';

const assetsRepository = new AssetsRepository();

describe('AssetsRepository', () => {
  describe('create', () => {
    it('should return the created user without password', async () => {
      const createdAsset = await assetsRepository.create({
        name: 'weg',
        logo: 'logo-url',
        b3_ticket: 'WEGE3',
        api_ticket: 'WEGE3SA',
        sector: 'sector',
        address: 'address',
        city: 'city',
        state: 'state',
        country: 'country',
        website: 'website-url',
        employees: 10,
        ceo: 'ceo',
      });

      expect(createdAsset).toHaveProperty('id');
    });
  });
});
