import { UserFactory } from '@factories/userFactory';
import { FakeUsersRepository } from '@modules/users/repositories/fakes/fakeUsersRepository';
import { AuthenticateUserUseCase } from '@modules/users/useCases/authenticateUser/authenticateUserUseCase';
import { AppError } from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;

let authenticateUserUseCase: AuthenticateUserUseCase;
let userFactory: UserFactory;

describe('authenticateUserUseCase', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    authenticateUserUseCase = new AuthenticateUserUseCase(fakeUsersRepository);
    userFactory = new UserFactory(fakeUsersRepository);
  });

  describe('when params are invalid', () => {
    it('should raise an AppError', async () => {
      await expect(
        authenticateUserUseCase.execute({
          email: '',
          password: '',
        }),
      ).rejects.toEqual(new AppError('E-mail e senha obrigatórios'));
    });
  });

  describe('when params are valid', () => {
    describe('when dont exist an user when specified email', () => {
      it('should raise an AppError', async () => {
        await userFactory.create({
          email: 'foo@bar.com',
        });

        await expect(
          authenticateUserUseCase.execute({
            email: 'wrong@email.com',
            password: 'wrong123',
          }),
        ).rejects.toEqual(new AppError('E-mail ou senha incorretos'));
      });
    });

    describe('when password mismatch', () => {
      it('should raise an AppError', async () => {
        await userFactory.create({
          email: 'foo@bar.com',
          password: 'foobar123',
        });

        await expect(
          authenticateUserUseCase.execute({
            email: 'foo@bar.com',
            password: 'wrong123',
          }),
        ).rejects.toEqual(new AppError('E-mail ou senha incorretos'));
      });
    });

    describe('when user exists with right password', () => {
      it('should return the expected result', async () => {
        await userFactory.create({
          email: 'foo@bar.com',
          password: 'foobar123',
        });

        const result = await authenticateUserUseCase.execute({
          email: 'foo@bar.com',
          password: 'foobar123',
        });

        expect(result).toHaveProperty('user');
        expect(result).toHaveProperty('token');
      });
    });
  });
});
