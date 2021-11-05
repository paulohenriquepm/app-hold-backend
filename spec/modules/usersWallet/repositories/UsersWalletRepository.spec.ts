import { UserFactory } from '@factories/userFactory';
import { UsersRepository } from '@modules/users/repositories/implementations/usersRepository';

import { UsersWalletFactory } from '@factories/usersWalletFactory';
import { UsersWalletRepository } from '@modules/usersWallet/repositories/implementations/UsersWalletRepository';

const usersRepository = new UsersRepository();
const userFactory = new UserFactory(usersRepository);

const usersWalletRepository = new UsersWalletRepository();
const usersWalletFactory = new UsersWalletFactory(usersWalletRepository);

describe('UsersWalletRepository', () => {
  describe('findByUserId', () => {
    describe('when exists an UserWallet with given user_id', () => {
      it('should return the UserWallet with given user_id', async () => {
        const createdUser = await userFactory.create();

        await usersWalletFactory.create(createdUser.id);

        const foundUserWallet = await usersWalletRepository.findByUserId(
          createdUser.id,
        );

        expect(foundUserWallet.userId).toBe(createdUser.id);
      });
    });

    describe('when do not exists an UserWallet with given user_id', () => {
      it('should return null', async () => {
        const foundUserWallet = await usersWalletRepository.findByUserId(123);

        expect(foundUserWallet).toBeNull;
      });
    });
  });

  describe('create', () => {
    it('should return the created user wallet', async () => {
      const createdUser = await userFactory.create();

      const createdUserWallet = await usersWalletRepository.create(
        createdUser.id,
      );

      expect(createdUserWallet).toHaveProperty('id');
    });
  });
});
