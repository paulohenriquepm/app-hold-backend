import { Prisma } from '.prisma/client';
import { IAssetsRepository } from '@modules/assets/repositories/IAssetsRepository';

import Chance from 'chance';

const chance = new Chance();

class AssetFactory {
  constructor(private assetsRepository: IAssetsRepository) {}

  build(attrs: Partial<Prisma.AssetCreateInput> = {}) {
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
      website: chance.url(),
      employees: chance.integer(),
      ceo: chance.name(),
      ...attrs,
    } as Prisma.AssetCreateInput;
  }

  create(attrs: Partial<Prisma.AssetCreateInput> = {}) {
    return this.assetsRepository.create(this.build(attrs));
  }
}

export { AssetFactory };
