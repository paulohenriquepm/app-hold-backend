import { User } from '@prisma/client';

import { IUpdateUserDTO } from '@modules/users/dtos/IUpdateUserDTO';

interface IUpdateUserUseCase {
  execute(user_id: number, data: IUpdateUserDTO): Promise<User>;
}

export { IUpdateUserUseCase };
