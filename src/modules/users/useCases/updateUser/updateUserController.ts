import { Request, Response } from 'express';

import { IUpdateUserController } from './IUpdateUserController';
import { IUpdateUserUseCase } from './IUpdateUserUseCase';

class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserUseCase: IUpdateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, old_password, new_password } = request.body;

    const user = await this.updateUserUseCase.execute(Number(id), {
      name,
      email,
      old_password,
      new_password,
    });

    return response.status(201).send(user);
  }
}

export { UpdateUserController };
