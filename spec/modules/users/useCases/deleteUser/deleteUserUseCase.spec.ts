import { FakeUsersRepository } from '@modules/users/repositories/fakes/fakeUsersRepository';
import { DeleteUserUseCase } from '@modules/users/useCases/deleteUser/deleteUserUseCase';

import { UserFactory } from '@factories/userFactory';

let fakeUsersRepository: FakeUsersRepository;

let deleteUserUseCase: DeleteUserUseCase;
let userFactory: UserFactory;

describe('deleteUserUseCase', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    deleteUserUseCase = new DeleteUserUseCase(fakeUsersRepository);

    userFactory = new UserFactory(fakeUsersRepository);
  });

  describe('when user exists', () => {
    it('should delete the user', async () => {
      const createdUser = await userFactory.create({
        name: 'Foo Bar',
        email: 'foo@bar.com',
      });

      await deleteUserUseCase.execute(createdUser.id);

      const userStillExists = fakeUsersRepository.findById(createdUser.id);

      expect(userStillExists).toBeNull;
    });
  });
});
