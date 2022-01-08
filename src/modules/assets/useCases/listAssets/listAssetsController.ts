import { Request, Response } from 'express';

import { IController } from '@shared/interfaces/IController';

import { IListAssetsUseCase } from './IListAssetsUseCase';

export interface IListAssetsFilters {
  nameOrTicket?: string;
  sector?: string;
}
class ListAssetsController implements IController {
  constructor(private readonly listAssetsUseCase: IListAssetsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { nameOrTicket, sector } = request.query as any;

    const filters = {
      nameOrTicket,
      sector,
    } as IListAssetsFilters;

    const assets = await this.listAssetsUseCase.execute(filters);

    return response.json(assets);
  }
}

export { ListAssetsController };
