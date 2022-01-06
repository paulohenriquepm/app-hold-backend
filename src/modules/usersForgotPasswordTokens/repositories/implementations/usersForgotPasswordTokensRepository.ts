import { UsersForgotPasswordTokens } from '@prisma/client';

import prisma from '@shared/db/prisma';

import { ICreateUserForgotPasswordTokenDTO } from '@modules/usersForgotPasswordTokens/dtos/ICreateUserForgotPasswordTokenDTO';

import { IUsersForgotPasswordTokensRepository } from '../IUsersForgotPasswordTokensRepository';

class UsersForgotPasswordTokensRepository
  implements IUsersForgotPasswordTokensRepository
{
  async create(
    data: ICreateUserForgotPasswordTokenDTO,
  ): Promise<UsersForgotPasswordTokens> {
    const createdUserForgotPasswordToken =
      await prisma.usersForgotPasswordTokens.create({
        data,
      });

    return createdUserForgotPasswordToken;
  }

  async findLastByUserId(user_id: number): Promise<UsersForgotPasswordTokens> {
    const usersForgotPasswordTokens =
      await prisma.usersForgotPasswordTokens.findMany({
        where: {
          userId: user_id,
        },
        orderBy: {
          created_at: 'desc',
        },
      });

    console.log(usersForgotPasswordTokens);

    return usersForgotPasswordTokens[0];
  }
}

export { UsersForgotPasswordTokensRepository };
