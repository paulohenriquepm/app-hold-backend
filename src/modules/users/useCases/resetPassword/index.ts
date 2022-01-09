import { UsersRepository } from '@modules/users/repositories/implementations/usersRepository';
import { UsersForgotPasswordTokensRepository } from '@modules/usersForgotPasswordTokens/repositories/implementations/usersForgotPasswordTokensRepository';
import { ResetPasswordController } from './ResetPasswordController';
import { ResetPasswordUseCase } from './ResetPasswordUseCase';

const usersRepository = new UsersRepository();
const usersForgotPasswordTokensRepository =
  new UsersForgotPasswordTokensRepository();

const resetPasswordUseCase = new ResetPasswordUseCase(usersRepository);

const resetPasswordController = new ResetPasswordController(
  resetPasswordUseCase,
);

export { resetPasswordController };
