import { Request, Response } from 'express';

import { IController } from '@shared/interfaces/IController';

import { IUpdateUserWalletAssetQuantityUseCase } from './IUpdateUserWalletAssetQuantityUseCase';

class UpdateUserWalletAssetQuantityController implements IController {
  constructor(
    private readonly updateUsersWalletAssetQuantityUseCase: IUpdateUserWalletAssetQuantityUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { user_wallet_asset_id } = request.params;
    const { quantity } = request.body;

    const updatedUserWalletAsset =
      await this.updateUsersWalletAssetQuantityUseCase.execute(
        Number(user_wallet_asset_id),
        quantity,
      );

    return response.json(updatedUserWalletAsset);
  }
}

export { UpdateUserWalletAssetQuantityController };
