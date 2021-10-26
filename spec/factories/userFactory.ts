import { Prisma } from '.prisma/client';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import Chance from 'chance';

const chance = new Chance();

class UserFactory {
  constructor(private usersRepository: IUsersRepository) {}

  build(attrs: Partial<Prisma.UserCreateInput> = {}) {
    return {
      name: chance.name(),
      email: chance.email(),
      password: chance.guid(),
      ...attrs,
    } as Prisma.UserCreateInput;
  }

  create(attrs: Partial<Prisma.UserCreateInput> = {}) {
    return this.usersRepository.create(this.build(attrs));
  }
}

export { UserFactory };
