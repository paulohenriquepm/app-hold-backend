import { ICreateUsersWalletAssetsDTO } from '@modules/usersWalletAssets/dtos/ICreateUsersWalletAssetsDTO';
import { UsersWalletAssets } from '@prisma/client';

import prisma from '@shared/db/prisma';

import { IUsersWalletAssetsRepository } from '../IUsersWalletAssetsRepository';

class UsersWalletAssetsRepository implements IUsersWalletAssetsRepository {
  async create(data: ICreateUsersWalletAssetsDTO): Promise<UsersWalletAssets> {
    const userWalletAsset = await prisma.usersWalletAssets.create({
      data,
    });

    return userWalletAsset;
  }
}

export { UsersWalletAssetsRepository };
