import { UsersWallet } from '@prisma/client';

import { IUsersWalletRepository } from '../IUsersWalletRepository';

class FakeUsersWalletRepository implements IUsersWalletRepository {
  usersWallet: UsersWallet[] = [];

  async findByUserId(user_id: number): Promise<UsersWallet> {
    const userWallet = this.usersWallet.find(
      wallet => wallet.userId === user_id,
    );

    return userWallet;
  }

  async create(user_id: number): Promise<UsersWallet> {
    const userWallet: UsersWallet = {} as UsersWallet;

    Object.assign(userWallet, {
      id: this.usersWallet.length + 1,
      userId: user_id,
    });

    this.usersWallet.push(userWallet);

    return userWallet;
  }
}

export { FakeUsersWalletRepository };
