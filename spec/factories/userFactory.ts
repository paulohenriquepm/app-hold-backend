import { User } from '.prisma/client';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import Chance from 'chance';

const chance = new Chance();

class UserFactory {
  constructor(private usersRepository: IUsersRepository) {}

  build(attrs: Partial<User> = {}) {
    return {
      name: chance.name(),
      email: chance.email(),
      password: chance.guid(),
      ...attrs,
    } as User;
  }

  create(attrs: Partial<User> = {}) {
    return this.usersRepository.create(this.build(attrs));
  }
}

export { UserFactory };
