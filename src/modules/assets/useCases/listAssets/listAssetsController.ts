import { Prisma } from '@prisma/client';
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
    const { nameOrTicket, sector, orderByField, orderByDirection } =
      request.query as any;

    const filters = {
      nameOrTicket,
      sector,
    } as IListAssetsFilters;

    const orderBy = {
      [orderByField]: orderByDirection,
    } as Prisma.AssetOrderByWithRelationInput;

    const assets = await this.listAssetsUseCase.execute(filters, orderBy);

    return response.json(assets);
  }
}

export { ListAssetsController };
