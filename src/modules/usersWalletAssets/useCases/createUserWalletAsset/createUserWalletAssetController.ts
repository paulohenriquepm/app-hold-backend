import { Request, Response } from 'express';

import { IController } from '@shared/interfaces/IController';

import { ICreateUserWalletAssetUseCase } from './ICreateUserWalletAssetUseCase';

class CreateUserWalletAssetController implements IController {
  constructor(
    private readonly createUsersWalletAssetsUseCase: ICreateUserWalletAssetUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const userWalletAsset = await this.createUsersWalletAssetsUseCase.execute(
      request.body,
    );

    return response.json(userWalletAsset);
  }
}

export { CreateUserWalletAssetController };
