import { UsersRepository } from '@modules/users/repositories/implementations/usersRepository';
import { DeleteUserController } from './deleteUserController';
import { DeleteUserUseCase } from './deleteUserUseCase';

const usersRepository = new UsersRepository();
const deleteUserUseCase = new DeleteUserUseCase(usersRepository);

const deleteUserController = new DeleteUserController(deleteUserUseCase);

export { deleteUserController };
