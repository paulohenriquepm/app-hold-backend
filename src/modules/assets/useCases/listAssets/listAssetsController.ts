import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';

import { IController } from '@shared/interfaces/IController';

import { IListAssetsUseCase } from './IListAssetsUseCase';

export interface IListAssetsFilters {
  nameOrTicket?: string;
  sector?: string;
  industry?: string;
  onlyAssetsThatCanCalculateDividend?: boolean;
}
class ListAssetsController implements IController {
  constructor(private readonly listAssetsUseCase: IListAssetsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nameOrTicket,
      sector,
      industry,
      orderByField,
      orderByDirection,
      nextCursor,
      onlyAssetsThatCanCalculateDividend,
    } = request.query as any;

    const filters = {
      nameOrTicket,
      onlyAssetsThatCanCalculateDividend:
        onlyAssetsThatCanCalculateDividend == 1,
      sector,
      industry,
    } as IListAssetsFilters;

    const orderBy = {
      [orderByField]: orderByDirection,
    } as Prisma.AssetOrderByWithRelationInput;

    const { assets, nextCursorId, totalCount } =
      await this.listAssetsUseCase.execute(filters, orderBy, nextCursor);

    return response.json({ assets, totalCount, nextCursorId });
  }
}

export { ListAssetsController };
