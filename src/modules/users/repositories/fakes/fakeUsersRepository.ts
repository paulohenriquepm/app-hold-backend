import { User } from '@prisma/client';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  users: User[] = [];

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user: User = {} as User;

    Object.assign(user, {
      id: this.users.length + 1,
      name,
      email,
      password,
    });

    this.users.push(user);

    return user;
  }
}

export { FakeUsersRepository };
