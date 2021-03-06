import { IController } from '@shared/interfaces/IController';
import { Request, Response } from 'express';

import { IResetPasswordUseCase } from './IResetPasswordUseCase';

class ResetPasswordController implements IController {
  constructor(private readonly resetPasswordUseCase: IResetPasswordUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    await this.resetPasswordUseCase.execute(email, password);

    return response.sendStatus(200);
  }
}

export { ResetPasswordController };
