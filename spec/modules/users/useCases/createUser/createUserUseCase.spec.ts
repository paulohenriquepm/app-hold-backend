import { UsersRepository } from '@modules/users/repositories/implementations/UsersRepository';
import { CreateUserUseCase } from '@modules/users/useCases/createUser/createUserUseCase';

import { AppError } from '@shared/errors/AppError';

let usersRepository: UsersRepository;

let createUserUseCase: CreateUserUseCase;

describe('createUserUseCase', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();

    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it('should be able to create a new user', async () => {
    const params = {
      email: 'foo@bar.com',
      name: 'Foo Bar',
      password: 'foobar123',
    };

    const createdUser = await createUserUseCase.execute(params);

    expect(createdUser).toHaveProperty('id');
  });

  it('should be not be able to create a new user with an existing email', async () => {
    const firstUserParams = {
      email: 'foo@bar.com',
      name: 'First Foo Bar',
      password: 'foobar123',
    };

    await createUserUseCase.execute(firstUserParams);

    const secondUserParams = {
      email: 'foo@bar.com',
      name: 'Second Foo Bar',
      password: 'foobar123',
    };

    await expect(
      createUserUseCase.execute(secondUserParams),
    ).rejects.toBeInstanceOf(AppError);
  });
});
