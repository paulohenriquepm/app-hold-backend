import { AppError } from '@shared/errors/AppError';

import { AssetFactory } from '@factories/assetFactory';
import { AssetsRepository } from '@modules/assets/repositories/implementations/assetsRepository';

let assetsRepository: AssetsRepository;
let assetFactory: AssetFactory;

describe('AssetsRepository', () => {
  beforeEach(() => {
    assetsRepository = new AssetsRepository();

    assetFactory = new AssetFactory(assetsRepository);
  });

  describe('create', () => {
    it('should create a new asset', async () => {
      const createdAsset = await assetFactory.create();

      expect(createdAsset).toHaveProperty('id');
    });
  });

  describe('update', () => {
    describe('when assets exists with given id', () => {
      it('should update the asset', async () => {
        const createdAsset = await assetFactory.create({
          name: 'old-name',
        });

        const upatedAsset = await assetsRepository.update(createdAsset.id, {
          name: 'new-name',
        });

        expect(upatedAsset.name).toBe('new-name');
      });
    });

    describe('when assets does not exist with given id', () => {
      it('should raise an AppError', async () => {
        await expect(
          assetsRepository.update(123, {
            name: 'new-name',
          }),
        ).rejects.toEqual(
          new AppError('Não existe nenhum ativo com o id: 123'),
        );
      });
    });
  });

  describe('findByB3Ticket', () => {
    describe('when asset exists with given b3_ticket', () => {
      it('should return the asset', async () => {
        const b3_ticket = 'WEGE3';

        await assetFactory.create({
          b3_ticket,
        });

        const foundAsset = await assetsRepository.findByB3Ticket(b3_ticket);

        expect(foundAsset.b3_ticket).toBe(b3_ticket);
      });
    });

    describe('when asset does not exist with given b3_ticket', () => {
      it('should return null', async () => {
        const b3_ticket = 'WEGE3';

        const foundAsset = await assetsRepository.findByB3Ticket(b3_ticket);

        expect(foundAsset).toBeNull;
      });
    });
  });

  describe('findById', () => {
    describe('when asset exists with given id', () => {
      it('should return the asset', async () => {
        const createdAsset = await assetFactory.create();

        const foundAsset = await assetsRepository.findById(createdAsset.id);

        expect(foundAsset.id).toBe(createdAsset.id);
      });
    });

    describe('when asset does not exist with given b3_ticket', () => {
      it('should return null', async () => {
        await expect(assetsRepository.findById(123)).rejects.toEqual(
          new AppError('Não existe nenhum ativo com o id: 123'),
        );
      });
    });
  });
});
