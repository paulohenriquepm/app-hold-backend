import { resolve } from 'path';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUsersForgotPasswordTokensRepository } from '@modules/usersForgotPasswordTokens/repositories/IUsersForgotPasswordTokensRepository';
import { AppError } from '@shared/errors/AppError';
import { IMailProvider } from '@shared/providers/MailProvider/IMailProvider';

import { ISendForgotPasswordEmailUserUseCase } from './ISendForgotPasswordEmailUseCase';

class SendForgotPasswordEmailUseCase
  implements ISendForgotPasswordEmailUserUseCase
{
  constructor(
    private mailProvider: IMailProvider,
    private usersRepository: IUsersRepository,
    private usersForgotPasswordTokensRepository: IUsersForgotPasswordTokensRepository,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'forgotPassword.hbs',
    );

    if (!user) throw new AppError('Não existe nenhum usuário com este e-mail!');

    const token = Math.floor(100000 + Math.random() * 900000);

    const currentDate = new Date();

    const expires_at = new Date(currentDate.getTime() + 60 * 60 * 1000);

    await this.usersForgotPasswordTokensRepository.create({
      userId: user.id,
      token: token.toString(),
      expires_at,
    });

    const variables = {
      name: user.name,
      token,
    };

    await this.mailProvider.sendMail(
      email,
      'Recuperação de Senha',
      variables,
      templatePath,
    );
  }
}

export { SendForgotPasswordEmailUseCase };
