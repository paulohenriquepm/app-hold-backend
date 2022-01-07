import { AppError } from '@shared/errors/AppError';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUsersForgotPasswordTokensRepository } from '@modules/usersForgotPasswordTokens/repositories/IUsersForgotPasswordTokensRepository';

import { ICheckResetPasswordTokenUseCase } from './ICheckResetPasswordTokenUseCase';

class CheckResetPasswordTokenUseCase
  implements ICheckResetPasswordTokenUseCase
{
  constructor(
    private usersRepository: IUsersRepository,
    private usersForgotPasswordTokensRepository: IUsersForgotPasswordTokensRepository,
  ) {}

  async execute(token: string, email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('Não existe nenhum usuário com este e-mail.');

    const userForgotPasswordToken =
      await this.usersForgotPasswordTokensRepository.findLastByUserId(user.id);

    if (!userForgotPasswordToken)
      throw new AppError(
        'Não foi requisitado um reset de senha para este e-mail.',
      );

    if (token !== userForgotPasswordToken.token)
      throw new AppError(
        'O token informado é diferente do enviado pelo e-mail.',
      );

    if (userForgotPasswordToken.expires_at < new Date())
      throw new AppError('O token para recuperação de senha foi expirado.');
  }
}

export { CheckResetPasswordTokenUseCase };
