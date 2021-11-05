import { UsersWallet } from '@prisma/client';

import prisma from '@shared/db/prisma';

import { IUsersWalletRepository } from '../IUsersWalletRepository';

class UsersWalletRepository implements IUsersWalletRepository {
  async findByUserId(user_id: number): Promise<UsersWallet> {
    const userWallet = await prisma.usersWallet.findUnique({
      where: {
        userId: user_id,
      },
    });

    return userWallet;
  }

  async create(user_id: number): Promise<UsersWallet> {
    const userWallet = await prisma.usersWallet.create({
      data: {
        userId: user_id,
      },
    });

    return userWallet;
  }
}

export { UsersWalletRepository };
