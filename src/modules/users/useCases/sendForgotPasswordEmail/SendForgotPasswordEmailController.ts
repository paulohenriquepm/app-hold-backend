import { IController } from '@shared/interfaces/IController';
import { Request, Response } from 'express';

import { ISendForgotPasswordEmailUserUseCase } from './ISendForgotPasswordEmailUseCase';

class SendForgotPasswordEmailController implements IController {
  constructor(
    private readonly sendForgotPasswordEmailUserUseCase: ISendForgotPasswordEmailUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    await this.sendForgotPasswordEmailUserUseCase.execute(email);

    return response.sendStatus(200);
  }
}

export { SendForgotPasswordEmailController };
