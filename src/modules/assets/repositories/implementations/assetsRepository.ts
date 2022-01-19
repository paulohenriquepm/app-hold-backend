import { Asset, Prisma } from '@prisma/client';

import prisma from '@shared/db/prisma';

import { AssetsListResponse, IAssetsRepository } from '../IAssetsRepository';
import { ICreateAssetDTO } from '@modules/assets/dtos/ICreateAssetDTO';
import { IUpdateAssetDTO } from '@modules/assets/dtos/IUpdateAssetDTO';
import { AppError } from '@shared/errors/AppError';
import { IListAssetsFilters } from '@modules/assets/useCases/listAssets/listAssetsController';
import { FilterOptions } from '@modules/assets/useCases/listAssetsFilterOptions/IListAssetsFilterOptionsUseCase';

class AssetsRepository implements IAssetsRepository {
  async create(data: ICreateAssetDTO): Promise<Asset> {
    const asset = await prisma.asset.create({
      data,
    });

    return asset;
  }

  async createMany(data: ICreateAssetDTO[]): Promise<Prisma.BatchPayload> {
    const count = await prisma.asset.createMany({
      data,
    });

    return count;
  }

  async update(asset_id: number, data: IUpdateAssetDTO): Promise<Asset> {
    const asset = await prisma.asset
      .update({
        where: {
          id: asset_id,
        },
        data,
      })
      .catch(() => {
        throw new AppError(`Não existe nenhum ativo com o id: ${asset_id}`);
      });

    return asset;
  }

  async list(
    filters: IListAssetsFilters,
    orderBy = { market_value: 'desc' } as Prisma.AssetOrderByWithRelationInput,
    nextCursor = '',
  ): Promise<AssetsListResponse> {
    const cursorObj =
      nextCursor === '' ? undefined : { id: parseInt(nextCursor) };
    const limit = 20;
    let where = {};

    if (filters?.nameOrTicket) {
      Object.assign(where, {
        OR: [
          {
            b3_ticket: {
              contains: filters.nameOrTicket,
              mode: 'insensitive',
            },
          },
          {
            name: {
              contains: filters.nameOrTicket,
              mode: 'insensitive',
            },
          },
        ],
      });
    }

    if (filters.onlyAssetsThatCanCalculateDividend) {
      Object.assign(where, {
        NOT: {
          last_12_months_dividends: {
            equals: null,
          },
        },
      });
    }

    if (filters?.sector) {
      Object.assign(where, {
        sector: {
          equals: filters.sector,
        },
      });
    }

    if (filters?.industry) {
      Object.assign(where, {
        industry: {
          equals: filters.industry,
        },
      });
    }

    const totalCount = await prisma.asset.count({
      where,
    });

    const assets = await prisma.asset.findMany({
      take: limit,
      cursor: cursorObj,
      skip: nextCursor === '' ? 0 : 1,
      where,
      orderBy,
    });

    return {
      assets,
      totalCount,
      nextCursorId: assets.length === limit ? assets[limit - 1].id : undefined,
    };
  }

  async listFilterOptions(): Promise<FilterOptions> {
    const sectorsFiltered = await prisma.asset.findMany({
      select: {
        sector: true,
      },
      orderBy: { sector: 'asc' },
      distinct: ['sector'],
    });

    const industriesFiltered = await prisma.asset.findMany({
      select: {
        industry: true,
      },
      orderBy: { industry: 'asc' },
      distinct: ['industry'],
    });

    const sectors = sectorsFiltered.map(sector => sector.sector);
    const industries = industriesFiltered.map(industry => industry.industry);

    return {
      sectors,
      industries,
    };
  }

  async findByB3Ticket(b3_ticket: string): Promise<Asset> {
    const asset = await prisma.asset.findFirst({
      where: {
        b3_ticket: {
          equals: b3_ticket,
        },
      },
    });

    return asset;
  }

  async findById(asset_id: number): Promise<Asset> {
    const asset = await prisma.asset.findUnique({
      where: {
        id: asset_id,
      },
      include: {
        AssetData: true,
      },
    });

    return asset;
  }
}

export { AssetsRepository };
