import { inject, injectable } from 'tsyringe';

import { UsersRepository } from '@modules/users/repositories/implementations/UsersRepository';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, email, password }: ICreateUserDTO) {
    await this.usersRepository.create({
      name,
      email,
      password,
    });
  }
}

export { CreateUserUseCase };
