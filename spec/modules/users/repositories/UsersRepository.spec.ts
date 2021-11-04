import { UserFactory } from '@factories/userFactory';
import { UsersRepository } from '@modules/users/repositories/implementations/UsersRepository';

const usersRepository = new UsersRepository();
const userFactory = new UserFactory(usersRepository);

describe('UsersRepository', () => {
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
});
