import { hash } from 'bcryptjs';

import { AppError } from '@shared/errors/AppError';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { IResetPasswordUseCase } from './IResetPasswordUseCase';

class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(email: string, password: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('Não existe nenhum usuário com este e-mail.');

    const encryptedPassword = await hash(password, 8);

    await this.usersRepository.update(user.id, { password: encryptedPassword });
  }
}

export { ResetPasswordUseCase };
