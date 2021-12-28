import { ICreateUsersWalletAssetsDTO } from '@modules/usersWalletAssets/dtos/ICreateUsersWalletAssetsDTO';
import { UsersWalletAssets } from '@prisma/client';

import prisma from '@shared/db/prisma';

import { IUsersWalletAssetsRepository } from '../IUsersWalletAssetsRepository';

class UsersWalletAssetsRepository implements IUsersWalletAssetsRepository {
  async findById(user_wallet_asset_id: number): Promise<UsersWalletAssets> {
    const userWalletAsset = await prisma.usersWalletAssets.findUnique({
      where: {
        id: user_wallet_asset_id,
      },
    });

    return userWalletAsset;
  }

  async create(data: ICreateUsersWalletAssetsDTO): Promise<UsersWalletAssets> {
    const userWalletAsset = await prisma.usersWalletAssets.create({
      data,
    });

    return userWalletAsset;
  }

  async destroy(user_wallet_asset_id: number): Promise<void> {
    await prisma.usersWalletAssets.delete({
      where: {
        id: user_wallet_asset_id,
      },
    });
  }
}

export { UsersWalletAssetsRepository };
