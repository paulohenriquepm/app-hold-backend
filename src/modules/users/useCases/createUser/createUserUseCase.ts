import { inject, singleton } from 'tsyringe';
import { hash } from 'bcryptjs';

import { User } from '.prisma/client';

import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { ICreateUserUseCase } from './ICreateUserUseCase';

@singleton()
class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) throw new AppError('E-mail já está em uso');

    const encryptedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: encryptedPassword,
    });

    delete user.password;

    return user;
  }
}

export { CreateUserUseCase };
