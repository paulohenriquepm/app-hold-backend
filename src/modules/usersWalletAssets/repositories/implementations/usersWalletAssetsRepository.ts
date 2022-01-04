import { Prisma, UsersWalletAssets } from '@prisma/client';

import { ICreateUsersWalletAssetsDTO } from '@modules/usersWalletAssets/dtos/ICreateUsersWalletAssetsDTO';
import { IUpdateUsersWalletAssetDTO } from '@modules/usersWalletAssets/dtos/IUpdateUsersWalletAssetDTO';

import prisma from '@shared/db/prisma';

import { IUsersWalletAssetsRepository } from '../IUsersWalletAssetsRepository';
import { AppError } from '@shared/errors/AppError';

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
            name: true,
            b3_ticket: true,
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

  async update(
    user_wallet_asset_id: number,
    data: IUpdateUsersWalletAssetDTO,
  ): Promise<UsersWalletAssets> {
    const userWalletAsset = await prisma.usersWalletAssets
      .update({
        where: {
          id: user_wallet_asset_id,
        },
        data,
      })
      .catch(() => {
        throw new AppError(
          `Não existe nenhum ativo com o id: ${user_wallet_asset_id}`,
        );
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
