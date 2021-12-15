import { FakeUsersRepository } from '@modules/users/repositories/fakes/fakeUsersRepository';
import { UpdateUserUseCase } from '@modules/users/useCases/updateUser/updateUserUseCase';
import { AppError } from '@shared/errors/AppError';
import { UserFactory } from '@factories/userFactory';

let fakeUsersRepository: FakeUsersRepository;

let updateUserUseCase: UpdateUserUseCase;
let userFactory: UserFactory;

describe('updateUserUseCase', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    updateUserUseCase = new UpdateUserUseCase(fakeUsersRepository);

    userFactory = new UserFactory(fakeUsersRepository);
  });

  describe('when user exists', () => {
    it('should update the user', async () => {
      const createdUser = await userFactory.create({
        name: 'Foo Bar',
        email: 'foo@bar.com',
      });

      const params = {
        name: 'Updated Foo Bar',
        email: 'updated-foo@bar.com',
      };

      const updatedUser = await updateUserUseCase.execute(
        createdUser.id,
        params,
      );

      expect(updatedUser.name).toBe(params.name);
    });

    it('should not update the user with the new email already belongs to another user', async () => {
      const email = 'foo@bar.com';

      await userFactory.create({
        email,
      });

      const createdUser = await userFactory.create({
        name: 'Foo Bar',
        email: 'other-foo@bar.com',
      });

      await expect(
        updateUserUseCase.execute(createdUser.id, {
          name: createdUser.name,
          email,
        }),
      ).rejects.toEqual(
        new AppError(`O email ${email} já está cadastrado na plataforma.`),
      );
    });

    it('should not update the user when old_password is incorrect', async () => {
      const createdUser = await userFactory.create({
        name: 'Foo Bar',
        email: 'foo@bar.com',
        password: 'foobar123',
      });

      await expect(
        updateUserUseCase.execute(createdUser.id, {
          name: createdUser.name,
          email: createdUser.email,
          old_password: 'wrong-password',
          new_password: 'new-password',
        }),
      ).rejects.toEqual(
        new AppError(`A senha atual informada está incorreta.`),
      );
    });
  });

  describe('when user does not exist', () => {
    it('should be not be able to create a new user with an existing email', async () => {
      await expect(
        updateUserUseCase.execute(123123, {
          email: 'foo@bar.com',
          name: 'Second Foo Bar',
        }),
      ).rejects.toBeInstanceOf(AppError);
    });
  });
});
