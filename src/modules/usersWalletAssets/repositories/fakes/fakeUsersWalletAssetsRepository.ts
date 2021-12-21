import { ICreateUsersWalletAssetsDTO } from '@modules/usersWalletAssets/dtos/ICreateUsersWalletAssetsDTO';
import { UsersWalletAssets } from '@prisma/client';

import { IUsersWalletAssetsRepository } from '../IUsersWalletAssetsRepository';

class FakeUsersWalletAssetsRepository implements IUsersWalletAssetsRepository {
  usersWalletAssets: UsersWalletAssets[] = [];

  async create(data: ICreateUsersWalletAssetsDTO): Promise<UsersWalletAssets> {
    const userWalletAsset: UsersWalletAssets = {} as UsersWalletAssets;

    Object.assign(userWalletAsset, {
      id: this.usersWalletAssets.length + 1,
      ...data,
    });

    this.usersWalletAssets.push(userWalletAsset);

    return userWalletAsset;
  }
}

export { FakeUsersWalletAssetsRepository };
