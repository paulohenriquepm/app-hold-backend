import { UsersRepository } from '@modules/users/repositories/implementations/usersRepository';
import { UsersForgotPasswordTokensRepository } from '@modules/usersForgotPasswordTokens/repositories/implementations/usersForgotPasswordTokensRepository';
import { CheckResetPasswordTokenController } from './CheckResetPasswordTokenController';
import { CheckResetPasswordTokenUseCase } from './CheckResetPasswordTokenUseCase';

const usersRepository = new UsersRepository();
const usersForgotPasswordTokensRepository =
  new UsersForgotPasswordTokensRepository();

const checkResetPasswordTokenUseCase = new CheckResetPasswordTokenUseCase(
  usersRepository,
  usersForgotPasswordTokensRepository,
);

const checkResetPasswordTokenController = new CheckResetPasswordTokenController(
  checkResetPasswordTokenUseCase,
);

export { checkResetPasswordTokenController };
