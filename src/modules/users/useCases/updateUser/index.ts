import { UsersRepository } from '@modules/users/repositories/implementations/usersRepository';
import { UpdateUserController } from './updateUserController';
import { UpdateUserUseCase } from './updateUserUseCase';

const usersRepository = new UsersRepository();
const updateUserUseCase = new UpdateUserUseCase(usersRepository);

const updateUserController = new UpdateUserController(updateUserUseCase);

export { updateUserController };
