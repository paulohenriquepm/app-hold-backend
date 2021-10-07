import { UsersRepository } from '@modules/users/repositories/implementations/UsersRepository';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';

class CreateUserUseCase {
  async execute({ name, email, password }: ICreateUserDTO) {
    const usersRepository = new UsersRepository();

    await usersRepository.create({
      name,
      email,
      password,
    });
  }
}

export { CreateUserUseCase };
