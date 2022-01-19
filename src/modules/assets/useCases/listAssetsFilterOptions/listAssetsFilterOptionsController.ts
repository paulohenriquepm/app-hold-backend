import { Request, Response } from 'express';

import { IController } from '@shared/interfaces/IController';

import { IListAssetsFilterOptionsUseCase } from './IListAssetsFilterOptionsUseCase';

class ListAssetsFilterOptionsController implements IController {
  constructor(
    private readonly listAssetsFilterOptionsUseCase: IListAssetsFilterOptionsUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const filters = await this.listAssetsFilterOptionsUseCase.execute();

    return response.json(filters);
  }
}

export { ListAssetsFilterOptionsController };
