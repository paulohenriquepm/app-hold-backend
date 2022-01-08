import { Request, Response } from 'express';

import { IController } from '@shared/interfaces/IController';

import { IListAssetsSectorsUseCase } from './IListAssetsSectorsUseCase';

class ListAssetsSectorsController implements IController {
  constructor(
    private readonly listAssetsSectorsUseCase: IListAssetsSectorsUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const sectors = await this.listAssetsSectorsUseCase.execute();

    return response.json(sectors);
  }
}

export { ListAssetsSectorsController };
