import { Asset, Prisma } from '@prisma/client';

import prisma from '@shared/db/prisma';

import { IAssetsRepository } from '../IAssetsRepository';
import { ICreateAssetDTO } from '@modules/assets/dtos/ICreateAssetDTO';
import { IUpdateAssetDTO } from '@modules/assets/dtos/IUpdateAssetDTO';
import { AppError } from '@shared/errors/AppError';
import { IListAssetsFilters } from '@modules/assets/useCases/listAssets/listAssetsController';

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
  ): Promise<Asset[]> {
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

    if (filters?.sector) {
      Object.assign(where, {
        sector: {
          equals: filters.sector,
        },
      });
    }

    const assets = await prisma.asset.findMany({
      where,
      orderBy,
    });

    return assets;
  }

  async listSectors(): Promise<string[]> {
    const sectors = await prisma.asset.findMany({
      select: {
        sector: true,
      },
      orderBy: { sector: 'asc' },
      distinct: ['sector'],
    });

    return sectors.map(sector => sector.sector);
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
