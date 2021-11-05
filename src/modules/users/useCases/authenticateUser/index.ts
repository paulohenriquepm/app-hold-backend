import { UsersRepository } from '@modules/users/repositories/implementations/usersRepository';
import { AuthenticateUserController } from './authenticateUserController';
import { AuthenticateUserUseCase } from './authenticateUserUseCase';

const usersRepository = new UsersRepository();
const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase,
);

export { authenticateUserController };
