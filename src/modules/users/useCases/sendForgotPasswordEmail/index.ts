import { UsersRepository } from '@modules/users/repositories/implementations/usersRepository';
import { UsersForgotPasswordTokensRepository } from '@modules/usersForgotPasswordTokens/repositories/implementations/usersForgotPasswordTokensRepository';
import { GmailMailProvider } from '@shared/providers/MailProvider/implementations/GmailMailProvider';
import { SendForgotPasswordEmailController } from './SendForgotPasswordEmailController';
import { SendForgotPasswordEmailUseCase } from './sendForgotPasswordEmailUseCase';

const usersRepository = new UsersRepository();
const gmailMailProvider = new GmailMailProvider();
const usersForgotPasswordTokensRepository =
  new UsersForgotPasswordTokensRepository();

const sendForgotPasswordEmailUseCase = new SendForgotPasswordEmailUseCase(
  gmailMailProvider,
  usersRepository,
  usersForgotPasswordTokensRepository,
);

const sendForgotPasswordEmailController = new SendForgotPasswordEmailController(
  sendForgotPasswordEmailUseCase,
);

export { sendForgotPasswordEmailController };
