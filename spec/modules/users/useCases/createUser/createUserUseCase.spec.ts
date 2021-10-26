import { FakeUsersRepository } from '@modules/users/repositories/fakes/fakeUsersRepository';
import { CreateUserUseCase } from '@modules/users/useCases/createUser/createUserUseCase';

import { AppError } from '@shared/errors/AppError';
import { UserFactory } from '@factories/userFactory';

let fakeUsersRepository: FakeUsersRepository;

let createUserUseCase: CreateUserUseCase;
let userFactory: UserFactory;

describe('createUserUseCase', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    createUserUseCase = new CreateUserUseCase(fakeUsersRepository);
    userFactory = new UserFactory(fakeUsersRepository);
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
    userFactory.create({
      email: 'foo@bar.com',
    });

    await expect(
      createUserUseCase.execute({
        email: 'foo@bar.com',
        name: 'Second Foo Bar',
        password: 'foobar123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
