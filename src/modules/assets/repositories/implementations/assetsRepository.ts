import { Asset } from '@prisma/client';

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
