import { UsersRepository } from '@modules/users/repositories/implementations/UsersRepository';
import { CreateUserUseCase } from '@modules/users/useCases/createUser/createUserUseCase';
import { CreateUserController } from '@modules/users/useCases/createUser/createUserController';

const usersRepository = new UsersRepository();
const createUserUseCase = new CreateUserUseCase(usersRepository);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
