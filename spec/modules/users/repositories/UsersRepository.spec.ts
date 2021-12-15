import { UserFactory } from '@factories/userFactory';
import { UsersRepository } from '@modules/users/repositories/implementations/usersRepository';
import { AppError } from '@shared/errors/AppError';

const usersRepository = new UsersRepository();
const userFactory = new UserFactory(usersRepository);

describe('UsersRepository', () => {
  describe('findById', () => {
    describe('when user exists with given id', () => {
      it('should return the user with given id', async () => {
        const createdUser = await userFactory.create();

        const foundUser = await usersRepository.findById(createdUser.id);

        expect(foundUser).not.toBeNull;
      });
    });

    describe('when user does not exist with given id', () => {
      it('should return null', async () => {
        await userFactory.create();

        const foundUser = await usersRepository.findById(123);

        expect(foundUser).toBeNull;
      });
    });
  });

  describe('findByEmail', () => {
    describe('when user exists with given email', () => {
      it('should return the user with given email', async () => {
        const email = 'foobar@gmail.com';

        await userFactory.create({
          email,
        });

        const foundUser = await usersRepository.findByEmail(email);

        expect(foundUser.email).toBe(email);
      });
    });

    describe('when user does not exist with given email', () => {
      it('should return null', async () => {
        const email = 'foobar@gmail.com';

        const foundUser = await usersRepository.findByEmail(email);

        expect(foundUser).toBeNull;
      });
    });
  });

  describe('create', () => {
    it('should return the created user without password', async () => {
      const createdUser = await usersRepository.create({
        name: 'Foo Bar',
        email: 'foobar@gmail.com',
        password: 'foobar123',
      });

      expect(createdUser).not.toHaveProperty('password');
    });
  });

  describe('update', () => {
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

        const updatedUser = await usersRepository.update(
          createdUser.id,
          params,
        );

        expect(updatedUser.name).toBe(params.name);
        expect(updatedUser.email).toBe(params.email);
      });
    });

    describe('when user doest not exist', () => {
      it('should return null', async () => {
        const params = {
          name: 'Updated Foo Bar',
          email: 'updated-foo@bar.com',
        };

        await expect(usersRepository.update(123, params)).rejects.toEqual(
          new AppError(`Usuário de id 123 não existe.`),
        );
      });
    });
  });
});
