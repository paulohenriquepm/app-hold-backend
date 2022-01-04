import { Request, Response } from 'express';

import { IController } from '@shared/interfaces/IController';

import { IDeleteUserWalletAssetUseCase } from './IDeleteUserWalletAssetUseCase';

class DeleteUserWalletAssetController implements IController {
  constructor(
    private readonly deleteUsersWalletAssetsUseCase: IDeleteUserWalletAssetUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await this.deleteUsersWalletAssetsUseCase.execute(Number(id));

    return response.sendStatus(200);
  }
}

export { DeleteUserWalletAssetController };
