import { hash, compare } from 'bcryptjs';

import { User } from '.prisma/client';

import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { ICreateUsersWalletUseCase } from '@modules/usersWallet/useCases/createUsersWallet/ICreateUsersWalletUseCase';
import { IUpdateUserUseCase } from './IUpdateUserUseCase';
import { IUpdateUserDTO } from '@modules/users/dtos/IUpdateUserDTO';

class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(user_id: number, data: IUpdateUserDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError(`Usuário de id ${user_id} não existe`);

    const existsUserWithUpdatedEmail = await this.usersRepository.findByEmail(
      data.email,
    );

    if (existsUserWithUpdatedEmail && existsUserWithUpdatedEmail.id !== user.id)
      throw new AppError(
        `O email ${data.email} já está cadastrado na plataforma.`,
      );

    if (data.old_password) {
      const checkOldPassword = await compare(data.old_password, user.password);

      if (!checkOldPassword)
        throw new AppError('A senha antiga informada está incorreta.');
    }

    if (data.new_password) {
      data.password = await hash(data.new_password, 8);
    }

    delete data.new_password;
    delete data.old_password;

    const updatedUser = this.usersRepository.update(user_id, data);

    return updatedUser;
  }
}

export { UpdateUserUseCase };
