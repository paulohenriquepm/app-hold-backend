import { Asset } from '.prisma/client';
import Chance from 'chance';

import { IAssetsRepository } from '@modules/assets/repositories/IAssetsRepository';

const chance = new Chance();
class AssetFactory {
  constructor(private assetsRepository: IAssetsRepository) {}

  build(attrs: Partial<Asset> = {}) {
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
      total_stocks: chance.integer(),
      last_12_months_dividends: chance.integer(),
      price: chance.integer(),
      ...attrs,
    } as Asset;
  }

  create(attrs: Partial<Asset> = {}) {
    return this.assetsRepository.create(this.build(attrs));
  }

  createMany(attrs: Partial<Asset> = {}, repeat: number = 1) {
    let assets: Asset[] = [];

    for (let index = 0; index < repeat; index++) {
      assets.push(this.build(attrs[index]));
    }

    return this.assetsRepository.createMany(assets);
  }
}

export { AssetFactory };
