import { UserFactory } from '@factories/userFactory';
import { UsersWalletFactory } from '@factories/usersWalletFactory';
import { FakeUsersRepository } from '@modules/users/repositories/fakes/fakeUsersRepository';
import { FakeUsersWalletRepository } from '@modules/usersWallet/repositories/fakes/fakeUsersWalletRepository';
import { CreateUsersWalletUseCase } from '@modules/usersWallet/useCases/createUsersWallet/createUsersWalletUseCase';
import { AppError } from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersWalletRepository: FakeUsersWalletRepository;

let createUsersWalletUseCase: CreateUsersWalletUseCase;

let userFactory: UserFactory;
let usersWalletFactory: UsersWalletFactory;

describe('createUsersWalletUseCase', () => {
  beforeEach(() => {
    fakeUsersWalletRepository = new FakeUsersWalletRepository();
    fakeUsersRepository = new FakeUsersRepository();

    createUsersWalletUseCase = new CreateUsersWalletUseCase(
      fakeUsersWalletRepository,
    );
    userFactory = new UserFactory(fakeUsersRepository);
    usersWalletFactory = new UsersWalletFactory(fakeUsersWalletRepository);
  });

  it('should be able to create a new user wallet', async () => {
    const user = await userFactory.create();

    const createdUserWallet = await createUsersWalletUseCase.execute(user.id);

    expect(createdUserWallet).toHaveProperty('id');
  });

  it('should not be able to create a new user wallet when already exists one with given user_id', async () => {
    const user = await userFactory.create();

    await usersWalletFactory.create(user.id);

    await expect(createUsersWalletUseCase.execute(user.id)).rejects.toEqual(
      new AppError('Já existe uma carteira para este usuário'),
    );
  });
});
