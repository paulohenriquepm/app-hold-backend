import { AssetData } from '.prisma/client';

import { ICreateAssetDataDTO } from '@modules/assetsData/dtos/ICreateAssetDataDTO';
import { IAssetsDataRepository } from '@modules/assetsData/repositories/IAssetsDataRepository';
import { AppError } from '@shared/errors/AppError';

import { ICreateAssetDataUseCase } from './ICreateAssetDataUseCase';

class CreateAssetDataUseCase implements ICreateAssetDataUseCase {
  constructor(private assetDataRepository: IAssetsDataRepository) {}

  async execute(data: ICreateAssetDataDTO): Promise<AssetData> {
    const assetDataExists =
      await this.assetDataRepository.findByAssetIdYearQuarter(
        data.assetId,
        data.year,
        data.quarter,
      );

    if (assetDataExists)
      throw new AppError(
        `Já existe dados para o ativo de id: ${data.assetId}, para o ano: ${data.year} e trimestre: ${data.quarter}`,
      );

    const assetData = await this.assetDataRepository.create(data);

    return assetData;
  }
}

export { CreateAssetDataUseCase };
