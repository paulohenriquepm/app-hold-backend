import { ICreateUsersWalletAssetsDTO } from '@modules/usersWalletAssets/dtos/ICreateUsersWalletAssetsDTO';
import { UsersWalletAssets } from '@prisma/client';

import { IUsersWalletAssetsRepository } from '../IUsersWalletAssetsRepository';

class FakeUsersWalletAssetsRepository implements IUsersWalletAssetsRepository {
  usersWalletAssets: UsersWalletAssets[] = [];

  async findById(user_wallet_asset_id: number): Promise<UsersWalletAssets> {
    return this.usersWalletAssets.find(
      asset => asset.id === user_wallet_asset_id,
    );
  }

  async create(data: ICreateUsersWalletAssetsDTO): Promise<UsersWalletAssets> {
    const userWalletAsset: UsersWalletAssets = {} as UsersWalletAssets;

    Object.assign(userWalletAsset, {
      id: this.usersWalletAssets.length + 1,
      ...data,
    });

    this.usersWalletAssets.push(userWalletAsset);

    return userWalletAsset;
  }

  async destroy(user_wallet_asset_id: number): Promise<void> {
    const filteredUsersWalletAssets = this.usersWalletAssets.filter(
      asset => asset.id !== user_wallet_asset_id,
    );

    this.usersWalletAssets = filteredUsersWalletAssets;
  }
}

export { FakeUsersWalletAssetsRepository };
