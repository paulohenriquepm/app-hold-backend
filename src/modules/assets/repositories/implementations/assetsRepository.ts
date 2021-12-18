import { Asset, Prisma } from '@prisma/client';

import prisma from '@shared/db/prisma';

import { IAssetsRepository } from '../IAssetsRepository';
import { ICreateAssetDTO } from '@modules/assets/dtos/ICreateAssetDTO';
import { IUpdateAssetDTO } from '@modules/assets/dtos/IUpdateAssetDTO';
import { AppError } from '@shared/errors/AppError';

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

  async list(includeAssetData: boolean, searchAsset: string): Promise<Asset[]> {
    const assets = await prisma.asset.findMany({
      where: {
        OR: [
          {
            b3_ticket: {
              contains: searchAsset,
              mode: 'insensitive',
            },
          },
          {
            name: {
              contains: searchAsset,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        AssetData: includeAssetData,
      },
    });

    return assets;
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
    });

    if (!asset)
      throw new AppError(`Não existe nenhum ativo com o id: ${asset_id}`);

    return asset;
  }
}

export { AssetsRepository };
