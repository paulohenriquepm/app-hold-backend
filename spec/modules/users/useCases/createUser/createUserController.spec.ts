import { Request, Response } from 'express';

import { mockResponse } from '@utils/mockResponse';
import { mockRequest } from '@utils/mockRequest';

import { CreateUserUseCase } from '@modules/users/useCases/createUser/createUserUseCase';
import { CreateUserController } from '@modules/users/useCases/createUser/createUserController';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';

jest.mock('@modules/users/useCases/createUser/createUserUseCase');

const CreateUserUseCaseMock = CreateUserUseCase as jest.Mock<CreateUserUseCase>;
const createUserUseCaseMock =
  new CreateUserUseCaseMock() as jest.Mocked<CreateUserUseCase>;

const createUserController = new CreateUserController(createUserUseCaseMock);

const request = mockRequest({
  name: 'Foo Bar',
  email: 'foo@bar.com',
  password: 'foobar123',
} as ICreateUserDTO);
const response = mockResponse();

describe('createUserController', () => {
  it('test', async () => {
    await createUserController.handle(request as Request, response as Response);

    expect(response.status).toHaveBeenCalledWith(201);
    expect(createUserUseCaseMock.execute).toHaveBeenCalled();
  });
});
