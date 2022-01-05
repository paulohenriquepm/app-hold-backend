import { User } from '@prisma/client';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  update(id: number, data: IUpdateUserDTO): Promise<User>;
  destroy(id: number): Promise<void>;
  findById(id: number): Promise<User>;
  findByEmail(email: string): Promise<User>;
}

export { IUsersRepository };
