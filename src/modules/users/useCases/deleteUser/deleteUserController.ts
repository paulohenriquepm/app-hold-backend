import { IController } from '@shared/interfaces/IController';
import { Request, Response } from 'express';

import { IDeleteUserUseCase } from './IDeleteUserUseCase';

class DeleteUserController implements IController {
  constructor(private readonly deleteUserUseCase: IDeleteUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await this.deleteUserUseCase.execute(Number(id));

    return response.sendStatus(200);
  }
}

export { DeleteUserController };
