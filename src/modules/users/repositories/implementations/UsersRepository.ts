import { User } from '@prisma/client';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';

import prisma from '@shared/db/prisma';

class UsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<User> {
    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    });

    return user;
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data,
    });

    delete user.password;

    return user;
  }
}

export { UsersRepository };
