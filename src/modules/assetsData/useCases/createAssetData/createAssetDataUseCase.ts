import { AssetData } from '.prisma/client';

import { ICreateAssetDataDTO } from '@modules/assetsData/dtos/ICreateAssetDataDTO';
import { IAssetsDataRepository } from '@modules/assetsData/repositories/IAssetsDataRepository';
import { AppError } from '@shared/errors/AppError';

import { ICreateAssetDataUseCase } from './ICreateAssetDataUseCase';

class CreateAssetDataUseCase implements ICreateAssetDataUseCase {
  constructor(private assetDataRepository: IAssetsDataRepository) {}

  async execute(data: ICreateAssetDataDTO): Promise<AssetData> {
    const assetDataByYearExists =
      await this.assetDataRepository.findByAssetIdYear(data.assetId, data.year);

    const assetDataByYearQuarterExists =
      await this.assetDataRepository.findByAssetIdYearQuarter(
        data.assetId,
        data.year,
        data.quarter,
      );

    if (assetDataByYearExists || assetDataByYearQuarterExists) return;

    const assetData = await this.assetDataRepository.create(data);

    return assetData;
  }
}

export { CreateAssetDataUseCase };
