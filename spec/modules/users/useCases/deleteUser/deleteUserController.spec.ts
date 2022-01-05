import { Request, Response } from 'express';

import { mockResponse } from '@utils/mockResponse';
import { mockRequest } from '@utils/mockRequest';

import { DeleteUserController } from '@modules/users/useCases/deleteUser/deleteUserController';
import { DeleteUserUseCase } from '@modules/users/useCases/deleteUser/deleteUserUseCase';

jest.mock('@modules/users/useCases/deleteUser/deleteUserUseCase');

const DeleteUserUseCaseMock = DeleteUserUseCase as jest.Mock<DeleteUserUseCase>;
const deleteUserUseCaseMock =
  new DeleteUserUseCaseMock() as jest.Mocked<DeleteUserUseCase>;

const deleteUserController = new DeleteUserController(deleteUserUseCaseMock);

const response = mockResponse();

describe('deleteUserController', () => {
  describe('when params are valid', () => {
    const user_id = 123;
    const request = mockRequest({ params: { id: user_id } });

    it('should return status 200 and call deleteUserUseCase with right params', async () => {
      await deleteUserController.handle(
        request as Request,
        response as Response,
      );

      expect(response.sendStatus).toHaveBeenCalledWith(200);
      expect(deleteUserUseCaseMock.execute).toHaveBeenCalledWith(user_id);
    });
  });
});
