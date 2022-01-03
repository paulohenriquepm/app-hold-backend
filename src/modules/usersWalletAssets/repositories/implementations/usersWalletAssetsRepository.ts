import { ICreateUsersWalletAssetsDTO } from '@modules/usersWalletAssets/dtos/ICreateUsersWalletAssetsDTO';
import { Prisma, UsersWalletAssets } from '@prisma/client';

import prisma from '@shared/db/prisma';

import { IUsersWalletAssetsRepository } from '../IUsersWalletAssetsRepository';

class UsersWalletAssetsRepository implements IUsersWalletAssetsRepository {
  async listByUserWalletId(
    user_wallet_id: number,
  ): Promise<UsersWalletAssets[]> {
    const userWalletAssets = await prisma.usersWalletAssets.findMany({
      where: {
        userWalletId: user_wallet_id,
      },
      include: {
        asset: {
          select: {
            price: true,
          },
        },
      },
    });

    return userWalletAssets;
  }

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

  async createMany(
    data: ICreateUsersWalletAssetsDTO[],
  ): Promise<Prisma.BatchPayload> {
    const count = await prisma.usersWalletAssets.createMany({
      data,
    });

    return count;
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
