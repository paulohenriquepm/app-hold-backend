import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IDeleteUserUseCase } from './IDeleteUserUseCase';

class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(user_id: number): Promise<void> {
    await this.usersRepository.destroy(user_id);
  }
}

export { DeleteUserUseCase };
