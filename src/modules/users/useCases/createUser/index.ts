import { UsersRepository } from '@modules/users/repositories/implementations/usersRepository';
import { CreateUserUseCase } from '@modules/users/useCases/createUser/createUserUseCase';
import { CreateUserController } from '@modules/users/useCases/createUser/createUserController';
import { CreateUsersWalletUseCase } from '@modules/usersWallet/useCases/createUsersWallet/createUsersWalletUseCase';
import { UsersWalletRepository } from '@modules/usersWallet/repositories/implementations/UsersWalletRepository';

const usersRepository = new UsersRepository();
const usersWalletRepository = new UsersWalletRepository();

const createUsersWalletUseCase = new CreateUsersWalletUseCase(
  usersWalletRepository,
);
const createUserUseCase = new CreateUserUseCase(
  usersRepository,
  createUsersWalletUseCase,
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
