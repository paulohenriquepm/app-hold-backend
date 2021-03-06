import { AssetData } from '.prisma/client';
import Chance from 'chance';

import { IAssetsDataRepository } from '@modules/assetsData/repositories/IAssetsDataRepository';

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
      net_margin: chance.integer(),
      roe: chance.integer(),
      payout: chance.integer(),
      ...attrs,
    } as AssetData;
  }

  create(attrs: Partial<AssetData> = {}) {
    return this.assetsDataRepository.create(this.build(attrs));
  }
}

export { AssetDataFactory };
