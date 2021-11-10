import { Prisma, UsersWallet } from '.prisma/client';

import { IUsersWalletRepository } from '@modules/usersWallet/repositories/IUsersWalletRepository';

class UsersWalletFactory {
  constructor(private usersWalletRepository: IUsersWalletRepository) {}

  build(user_id: number) {
    return {
      userId: user_id,
    } as UsersWallet;
  }

  create(user_id: number) {
    return this.usersWalletRepository.create(user_id);
  }
}

export { UsersWalletFactory };
