import { Asset, Prisma } from '.prisma/client';
import { ICreateAssetDTO } from '@modules/assets/dtos/ICreateAssetDTO';
import { IAssetsRepository } from '@modules/assets/repositories/IAssetsRepository';

import Chance from 'chance';

const chance = new Chance();
class AssetFactory {
  constructor(private assetsRepository: IAssetsRepository) {}

  build(attrs: Partial<ICreateAssetDTO> = {}) {
    return {
      name: chance.name(),
      logo: chance.url(),
      b3_ticket: chance.prefix(),
      api_ticket: chance.prefix(),
      sector: chance.name(),
      address: chance.address(),
      city: chance.city(),
      state: chance.state(),
      country: chance.country(),
      zip: chance.zip(),
      website: chance.url(),
      employees: chance.integer(),
      ceo: chance.name(),
      ...attrs,
    } as ICreateAssetDTO;
  }

  create(attrs: Partial<ICreateAssetDTO> = {}) {
    return this.assetsRepository.create(this.build(attrs));
  }

  createMany(attrs: Partial<ICreateAssetDTO> = {}, repeat: number = 1) {
    let assets: ICreateAssetDTO[] = [];

    for (let index = 0; index < repeat; index++) {
      assets.push(this.build(attrs[index]));
    }

    return this.assetsRepository.createMany(assets);
  }
}

export { AssetFactory };
