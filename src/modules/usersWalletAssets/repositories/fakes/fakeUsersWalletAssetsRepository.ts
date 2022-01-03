import { Prisma, UsersWalletAssets } from '@prisma/client';

import { ICreateUsersWalletAssetsDTO } from '@modules/usersWalletAssets/dtos/ICreateUsersWalletAssetsDTO';

import { IUsersWalletAssetsRepository } from '../IUsersWalletAssetsRepository';

class FakeUsersWalletAssetsRepository implements IUsersWalletAssetsRepository {
  usersWalletAssets: UsersWalletAssets[] = [];

  async findById(user_wallet_asset_id: number): Promise<UsersWalletAssets> {
    return this.usersWalletAssets.find(
      asset => asset.id === user_wallet_asset_id,
    );
  }

  async listByUserWalletId(
    user_wallet_id: number,
  ): Promise<UsersWalletAssets[]> {
    return this.usersWalletAssets.filter(
      asset => asset.userWalletId === user_wallet_id,
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

  async createMany(
    data: ICreateUsersWalletAssetsDTO[],
  ): Promise<Prisma.BatchPayload> {
    data.forEach(assetItem => {
      let userWalletAsset: UsersWalletAssets = {} as UsersWalletAssets;

      Object.assign(userWalletAsset, {
        id: this.usersWalletAssets.length + 1,
        ...assetItem,
      });

      this.usersWalletAssets.push(userWalletAsset);
    });

    return { count: data.length };
  }

  async destroy(user_wallet_asset_id: number): Promise<void> {
    const filteredUsersWalletAssets = this.usersWalletAssets.filter(
      asset => asset.id !== user_wallet_asset_id,
    );

    this.usersWalletAssets = filteredUsersWalletAssets;
  }
}

export { FakeUsersWalletAssetsRepository };
