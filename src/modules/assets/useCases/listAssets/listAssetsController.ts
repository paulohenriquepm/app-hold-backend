import { Request, Response } from 'express';

import { IController } from '@shared/interfaces/IController';

import { IListAssetsUseCase } from './IListAssetsUseCase';

class ListAssetsController implements IController {
  constructor(private readonly listAssetsUseCase: IListAssetsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { searchAsset } = request.query as any;

    const assets = await this.listAssetsUseCase.execute(searchAsset);

    return response.json(assets);
  }
}

export { ListAssetsController };
