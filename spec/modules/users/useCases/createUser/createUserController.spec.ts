import { Request, Response } from 'express';

import { mockResponse } from '@spec-utils/mockResponse';
import { mockRequest } from '@spec-utils/mockRequest';

import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '@modules/users/useCases/createUser/createUserUseCase';
import { CreateUserController } from '@modules/users/useCases/createUser/createUserController';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';

jest.mock('@modules/users/useCases/createUser/createUserUseCase');

const CreateUserUseCaseMock = CreateUserUseCase as jest.Mock<CreateUserUseCase>;
const createUserUseCaseMock =
  new CreateUserUseCaseMock() as jest.Mocked<CreateUserUseCase>;
const createUserController = new CreateUserController(createUserUseCaseMock);

const response = mockResponse();

describe('createUserController', () => {
  describe('when params are valid', () => {
    const data = {
      name: 'Foo Bar',
      email: 'foo@bar.com',
      password: 'foobar123',
    } as ICreateUserDTO;
    const request = mockRequest({ body: data });

    it('should return status 201 and call createUserUseCase with right params', async () => {
      await createUserController.handle(
        request as Request,
        response as Response,
      );

      expect(response.status).toHaveBeenCalledWith(201);
      expect(createUserUseCaseMock.execute).toHaveBeenCalledWith(data);
    });
  });

  describe('when email already exists', () => {
    const data = {} as ICreateUserDTO;
    const request = mockRequest({ body: data });

    it('should return status with 400 and call createUserUseCase with right params', async () => {
      createUserUseCaseMock.execute.mockRejectedValueOnce(
        new AppError('E-mail já está em uso'),
      );

      await expect(
        createUserController.handle(request as Request, response as Response),
      ).rejects.toEqual(new AppError('E-mail já está em uso'));

      expect(createUserUseCaseMock.execute).toHaveBeenCalledWith(data);
    });
  });
});
