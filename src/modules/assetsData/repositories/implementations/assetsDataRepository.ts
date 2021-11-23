import { AssetData } from '@prisma/client';

import prisma from '@shared/db/prisma';

import { AppError } from '@shared/errors/AppError';
import { IAssetsDataRepository } from '../IAssetsDataRepository';
import { ICreateAssetDataDTO } from '@modules/assetsData/dtos/ICreateAssetDataDTO';

class AssetsDataRepository implements IAssetsDataRepository {
  async create(data: ICreateAssetDataDTO): Promise<AssetData> {
    const assetData = await prisma.assetData.create({
      data,
    });

    return assetData;
  }

  async findByAssetId(asset_id: number): Promise<AssetData> {
    const assetData = await prisma.assetData.findUnique({
      where: {
        assetId: asset_id,
      },
    });

    if (!assetData)
      throw new AppError(
        `Não existe nenhum dado para o ativo com o id: ${asset_id}`,
      );

    return assetData;
  }

  async findByAssetIdYearQuarter(
    asset_id: number,
    year: number,
    quarter: number,
  ): Promise<AssetData> {
    const assetData = await prisma.assetData.findFirst({
      where: {
        assetId: asset_id,
        year,
        quarter,
      },
    });

    return assetData;
  }
}

export { AssetsDataRepository };
