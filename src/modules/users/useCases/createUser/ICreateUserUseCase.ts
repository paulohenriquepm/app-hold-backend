import { User } from '@prisma/client';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';

interface ICreateUserUseCase {
  execute(data: ICreateUserDTO): Promise<User>;
}

export { ICreateUserUseCase };
