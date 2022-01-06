import { UsersForgotPasswordTokens } from '@prisma/client';

import { ICreateUserForgotPasswordTokenDTO } from '../dtos/ICreateUserForgotPasswordTokenDTO';

interface IUsersForgotPasswordTokensRepository {
  create(
    data: ICreateUserForgotPasswordTokenDTO,
  ): Promise<UsersForgotPasswordTokens>;
  findLastByUserId(user_id: number): Promise<UsersForgotPasswordTokens>;
}

export { IUsersForgotPasswordTokensRepository };
