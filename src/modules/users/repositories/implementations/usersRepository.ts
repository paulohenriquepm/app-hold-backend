import { User } from '@prisma/client';

import prisma from '@shared/db/prisma';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';

import { IUsersRepository } from '../IUsersRepository';
import { IUpdateUserDTO } from '@modules/users/dtos/IUpdateUserDTO';
import { AppError } from '@shared/errors/AppError';

class UsersRepository implements IUsersRepository {
  async findById(id: number): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

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

  async update(id: number, data: IUpdateUserDTO): Promise<User> {
    const user = await prisma.user
      .update({
        where: {
          id,
        },
        data,
      })
      .catch(e => {
        throw new AppError(`Usuário de id ${id} não existe.`);
      });

    return user;
  }
}

export { UsersRepository };
