import { User } from '@prisma/client';

import prisma from '@shared/db/prisma';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';

import { IUsersRepository } from '../IUsersRepository';

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
