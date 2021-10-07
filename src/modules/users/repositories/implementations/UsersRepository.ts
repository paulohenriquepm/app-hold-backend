import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';

import prisma from '@shared/db/prisma';

class UsersRepository implements IUsersRepository {
  async create(data: ICreateUserDTO): Promise<void> {
    await prisma.user.create({
      data,
    });
  }
}

export { UsersRepository };
