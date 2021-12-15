import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { IAuthenticateUserDTO } from '@modules/users/dtos/IAuthenticateUserDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import auth from '@shared/config/auth';
import {
  IAuthenticateUserUseCase,
  IAuthenticateUserUseCaseResponse,
} from './IAuthenticateUserUseCase';

const { secret_token, expires_in_token } = auth;

class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<IAuthenticateUserUseCaseResponse> {
    if (!email || !password) throw new AppError('E-mail e senha obrigatórios');

    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('E-mail ou senha incorretos');

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError('E-mail ou senha incorretos');

    const token = sign({}, secret_token, {
      subject: user.id.toString(),
      expiresIn: expires_in_token,
    });

    delete user.password;

    return {
      user,
      token,
    };
  }
}

export { AuthenticateUserUseCase };
