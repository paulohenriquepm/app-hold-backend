import { Request, Response } from 'express';

import { ICreateUserController } from './ICreateUserController';
import { ICreateUserUseCase } from './ICreateUserUseCase';

class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserUseCase: ICreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    await this.createUserUseCase.execute({
      name,
      email,
      password,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
