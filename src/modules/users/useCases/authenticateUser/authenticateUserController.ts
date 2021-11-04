import { Request, Response } from 'express';

import { IAuthenticateUserController } from './IAuthenticateUserController';
import { IAuthenticateUserUseCase } from './IAuthenticateUserUseCase';

class AuthenticateUserController implements IAuthenticateUserController {
  constructor(
    private readonly authenticateUserUseCase: IAuthenticateUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const { user, token } = await this.authenticateUserUseCase.execute({
      password,
      email,
    });

    return response.json({
      user,
      token,
    });
  }
}

export { AuthenticateUserController };
