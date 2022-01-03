import { UsersWalletAssets } from '.prisma/client';
import Chance from 'chance';

import { IUsersWalletAssetsRepository } from '@modules/usersWalletAssets/repositories/IUsersWalletAssetsRepository';

const chance = new Chance();

class UsersWalletAssetsFactory {
  constructor(
    private usersWalletAssetsRepository: IUsersWalletAssetsRepository,
  ) {}

  build(attrs: Partial<UsersWalletAssets> = {}) {
    return {
      quantity: chance.integer(),
      ...attrs,
    } as UsersWalletAssets;
  }

  create(attrs: Partial<UsersWalletAssets> = {}) {
    return this.usersWalletAssetsRepository.create(this.build(attrs));
  }

  createMany(attrs: Partial<UsersWalletAssets> = {}, repeat: number = 1) {
    let assets: UsersWalletAssets[] = [];

    for (let index = 0; index < repeat; index++) {
      assets.push(this.build(attrs));
    }

    return this.usersWalletAssetsRepository.createMany(assets);
  }
}

export { UsersWalletAssetsFactory };
