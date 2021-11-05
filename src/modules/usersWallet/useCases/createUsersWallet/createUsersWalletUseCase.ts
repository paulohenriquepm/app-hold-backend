import { UsersWallet } from '.prisma/client';

import { AppError } from '@shared/errors/AppError';
import { ICreateUsersWalletUseCase } from './ICreateUsersWalletUseCase';
import { IUsersWalletRepository } from '@modules/usersWallet/repositories/IUsersWalletRepository';

class CreateUsersWalletUseCase implements ICreateUsersWalletUseCase {
  constructor(private usersWalletRepository: IUsersWalletRepository) {}

  async execute(user_id: number): Promise<UsersWallet> {
    const userWalletExists = await this.usersWalletRepository.findByUserId(
      user_id,
    );

    if (userWalletExists)
      throw new AppError('Já existe uma carteira para este usuário');

    const userWallet = await this.usersWalletRepository.create(user_id);

    return userWallet;
  }
}

export { CreateUsersWalletUseCase };
