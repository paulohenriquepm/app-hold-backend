import { IController } from '@shared/interfaces/IController';
import { Request, Response } from 'express';

import { ICheckResetPasswordTokenUseCase } from './ICheckResetPasswordTokenUseCase';

class CheckResetPasswordTokenController implements IController {
  constructor(
    private readonly checkResetPasswordTokenUseCase: ICheckResetPasswordTokenUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token, email } = request.body;

    await this.checkResetPasswordTokenUseCase.execute(token, email);

    return response.sendStatus(200);
  }
}

export { CheckResetPasswordTokenController };
