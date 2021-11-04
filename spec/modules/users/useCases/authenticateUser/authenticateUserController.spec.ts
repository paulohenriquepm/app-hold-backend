import { Request, Response } from 'express';

import { mockResponse } from '@utils/mockResponse';
import { mockRequest } from '@utils/mockRequest';

import { AppError } from '@shared/errors/AppError';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { AuthenticateUserUseCase } from '@modules/users/useCases/authenticateUser/authenticateUserUseCase';
import { AuthenticateUserController } from '@modules/users/useCases/authenticateUser/authenticateUserController';

jest.mock('@modules/users/useCases/authenticateUser/authenticateUserUseCase');

const AuthenticateUserUseCaseMock =
  AuthenticateUserUseCase as jest.Mock<AuthenticateUserUseCase>;
const authenticateUserUseCaseMock =
  new AuthenticateUserUseCaseMock() as jest.Mocked<AuthenticateUserUseCase>;
const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCaseMock,
);

const response = mockResponse();

describe('authenticateUserController', () => {
  describe('when params are valid', () => {
    const data = {
      email: 'foo@bar.com',
      password: 'foobar123',
    } as ICreateUserDTO;
    const request = mockRequest({ body: data });

    const expectedResult = 'user-token';
    authenticateUserUseCaseMock.execute.mockResolvedValueOnce({
      user: data,
      token: expectedResult,
    });

    it('should call authenticateUserUseCase with right params', async () => {
      await authenticateUserController.handle(
        request as Request,
        response as Response,
      );

      expect(response.json).toHaveBeenCalledWith({
        user: data,
        token: expectedResult,
      });
      expect(authenticateUserUseCaseMock.execute).toHaveBeenCalledWith(data);
    });
  });

  describe('when params are invalid', () => {
    const data = {} as ICreateUserDTO;
    const request = mockRequest({ body: data });

    it('should call createUserUseCase with right params but raise an AppError', async () => {
      authenticateUserUseCaseMock.execute.mockRejectedValueOnce(
        new AppError('E-mail e senha obrigatórios'),
      );

      await expect(
        authenticateUserController.handle(
          request as Request,
          response as Response,
        ),
      ).rejects.toEqual(new AppError('E-mail e senha obrigatórios'));

      expect(response.json).toHaveBeenCalledTimes(0);
      expect(authenticateUserUseCaseMock.execute).toHaveBeenCalledWith(data);
    });
  });
});
