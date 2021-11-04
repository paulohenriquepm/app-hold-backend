import { IAuthenticateUserDTO } from '@modules/users/dtos/IAuthenticateUserDTO';

export interface IAuthenticateUserUseCaseResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

interface IAuthenticateUserUseCase {
  execute(
    data: IAuthenticateUserDTO,
  ): Promise<IAuthenticateUserUseCaseResponse>;
}

export { IAuthenticateUserUseCase };
