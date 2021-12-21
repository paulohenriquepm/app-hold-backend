import { Request, Response } from 'express';

import { IController } from '@shared/interfaces/IController';

import { ICreateUsersWalletAssetsUseCase } from './ICreateUsersWalletAssetsUseCase';

class CreateUsersWalletAssetsController implements IController {
  constructor(
    private readonly createUsersWalletAssetsUseCase: ICreateUsersWalletAssetsUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const userWalletAsset = await this.createUsersWalletAssetsUseCase.execute(
      request.body,
    );

    return response.json(userWalletAsset);
  }
}

export { CreateUsersWalletAssetsController };
