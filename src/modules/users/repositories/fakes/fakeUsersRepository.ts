import { User } from '@prisma/client';
import { hash } from 'bcryptjs';

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

    const encryptedPassword = await hash(password, 8);

    Object.assign(user, {
      id: this.users.length + 1,
      name,
      email,
      password: encryptedPassword,
    });

    this.users.push(user);

    return user;
  }
}

export { FakeUsersRepository };
