import { Request, Response } from 'express';

import { IController } from '@shared/interfaces/IController';

import { IShowAssetUseCase } from './IShowAssetUseCase';

class ShowAssetController implements IController {
  constructor(private readonly showAssetUseCase: IShowAssetUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const asset = await this.showAssetUseCase.execute(parseInt(id));

    return response.json(asset);
  }
}

export { ShowAssetController };
