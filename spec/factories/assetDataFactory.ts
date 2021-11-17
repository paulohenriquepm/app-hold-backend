import { AssetData } from '.prisma/client';

import { IAssetsDataRepository } from '@modules/assetsData/repositories/IAssetsDataRepository';

import Chance from 'chance';

const chance = new Chance();

class AssetDataFactory {
  constructor(private assetsDataRepository: IAssetsDataRepository) {}

  build(attrs: Partial<AssetData> = {}) {
    return {
      revenue: chance.integer(),
      net_income: chance.integer(),
      dividends_paid: chance.integer(),
      fco: chance.integer(),
      fcf: chance.integer(),
      ebit: chance.integer(),
      cash: chance.integer(),
      equity: chance.integer(),
      year: chance.integer(),
      quarter: chance.integer(),
      ...attrs,
    } as AssetData;
  }

  create(attrs: Partial<AssetData> = {}) {
    return this.assetsDataRepository.create(this.build(attrs));
  }
}

export { AssetDataFactory };
