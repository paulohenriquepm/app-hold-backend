import { User } from '@prisma/client';
import { hash } from 'bcryptjs';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';
import { IUpdateUserDTO } from '@modules/users/dtos/IUpdateUserDTO';

class FakeUsersRepository implements IUsersRepository {
  users: User[] = [];

  async findById(id: number): Promise<User> {
    const user = this.users.find(user => user.id === id);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  async update(
    id: number,
    { name, email, old_password, new_password }: IUpdateUserDTO,
  ): Promise<User> {
    const userIndex = this.users.findIndex(user => user.id === id);

    this.users[userIndex].name = name;
    this.users[userIndex].email = email;

    if (new_password) {
      const encryptedPassword = await hash(new_password, 8);

      this.users[userIndex].password = encryptedPassword;
    }

    return this.users[userIndex];
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

  async destroy(user_id: number): Promise<void> {
    this.users = this.users.filter(user => user.id !== user_id);
  }
}

export { FakeUsersRepository };
