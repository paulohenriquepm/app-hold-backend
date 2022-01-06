import { hash } from 'bcryptjs';

import { AppError } from '@shared/errors/AppError';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUsersForgotPasswordTokensRepository } from '@modules/usersForgotPasswordTokens/repositories/IUsersForgotPasswordTokensRepository';

import { IResetPasswordUseCase } from './IResetPasswordUseCase';

class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private usersForgotPasswordTokensRepository: IUsersForgotPasswordTokensRepository,
  ) {}

  async execute(token: string, email: string, password: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('Não existe nenhum usuário com este e-mail.');

    const userForgotPasswordToken =
      await this.usersForgotPasswordTokensRepository.findLastByUserId(user.id);

    if (!userForgotPasswordToken)
      throw new AppError('Este e-mail não foi requisitado o reset de senha.');

    if (token !== userForgotPasswordToken.token)
      throw new AppError(
        'O token informado é diferente do enviado pelo e-mail.',
      );

    if (userForgotPasswordToken.expires_at < new Date())
      throw new AppError('Token para reset de senha foi expirado.');

    const encryptedPassword = await hash(password, 8);

    await this.usersRepository.update(user.id, { password: encryptedPassword });
  }
}

export { ResetPasswordUseCase };
