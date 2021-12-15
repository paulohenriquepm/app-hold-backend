import { Request, Response } from 'express';

import { mockResponse } from '@utils/mockResponse';
import { mockRequest } from '@utils/mockRequest';

import { UpdateUserController } from '@modules/users/useCases/updateUser/updateUserController';
import { UpdateUserUseCase } from '@modules/users/useCases/updateUser/updateUserUseCase';
import { IUpdateUserDTO } from '@modules/users/dtos/IUpdateUserDTO';

jest.mock('@modules/users/useCases/updateUser/updateUserUseCase');

const UpdateUserUseCaseMock = UpdateUserUseCase as jest.Mock<UpdateUserUseCase>;
const updateUserUseCaseMock =
  new UpdateUserUseCaseMock() as jest.Mocked<UpdateUserUseCase>;

const updateUserController = new UpdateUserController(updateUserUseCaseMock);

const response = mockResponse();

describe('updateUserController', () => {
  describe('when params are valid', () => {
    const user_id = 123;
    const data = {
      name: 'Foo Bar',
      email: 'foo@bar.com',
    } as IUpdateUserDTO;
    const request = mockRequest({ body: data, params: { id: user_id } });

    it('should return status 201 and call updateUserUseCase with right params', async () => {
      await updateUserController.handle(
        request as Request,
        response as Response,
      );

      expect(response.status).toHaveBeenCalledWith(201);
      expect(updateUserUseCaseMock.execute).toHaveBeenCalledWith(user_id, data);
    });
  });
});
