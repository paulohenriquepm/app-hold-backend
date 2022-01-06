import { UserFactory } from '@factories/userFactory';
import { UsersRepository } from '@modules/users/repositories/implementations/usersRepository';
import { UsersForgotPasswordTokensRepository } from '@modules/usersForgotPasswordTokens/repositories/implementations/usersForgotPasswordTokensRepository';

let usersForgotPasswordTokensRepository: UsersForgotPasswordTokensRepository;
let usersRepository: UsersRepository;

let usersFactory: UserFactory;

describe('UsersForgotPasswordTokensRepository', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    usersForgotPasswordTokensRepository =
      new UsersForgotPasswordTokensRepository();

    usersFactory = new UserFactory(usersRepository);
  });

  describe('create', () => {
    it('should create a new user token', async () => {
      const createdUser = await usersFactory.create();

      const createdUserForgotPasswordToken =
        await usersForgotPasswordTokensRepository.create({
          token: '123123',
          expires_at: new Date(),
          userId: createdUser.id,
        });

      expect(createdUserForgotPasswordToken).toHaveProperty('id');
    });
  });
});
