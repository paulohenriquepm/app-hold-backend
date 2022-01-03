import { Request, Response } from 'express';

import { IController } from '@shared/interfaces/IController';

import { IListUserWalletAssetsUseCase } from './IListUserWalletAssetsUseCase';

class ListUserWalletAssetsController implements IController {
  constructor(
    private readonly listUsersWalletAssetsUseCase: IListUserWalletAssetsUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { user_wallet_id } = request.params;

    const userWalletAssets = await this.listUsersWalletAssetsUseCase.execute(
      Number(user_wallet_id),
    );

    return response.json(userWalletAssets);
  }
}

export { ListUserWalletAssetsController };
