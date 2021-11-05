import { Prisma } from '.prisma/client';

import { IUsersWalletRepository } from '@modules/usersWallet/repositories/IUsersWalletRepository';

class UsersWalletFactory {
  constructor(private usersWalletRepository: IUsersWalletRepository) {}

  build(user_id: number) {
    return {
      user: user_id,
    } as Prisma.UsersWalletCreateInput;
  }

  create(user_id: number) {
    return this.usersWalletRepository.create(user_id);
  }
}

export { UsersWalletFactory };
