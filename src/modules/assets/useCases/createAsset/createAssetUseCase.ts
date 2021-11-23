import { Asset } from '.prisma/client';

import { AppError } from '@shared/errors/AppError';

import { ICreateAssetDTO } from '@modules/assets/dtos/ICreateAssetDTO';
import { IAssetsRepository } from '@modules/assets/repositories/IAssetsRepository';
import { ICreateAssetUseCase } from './ICreateAssetUseCase';

class CreateAssetUseCase implements ICreateAssetUseCase {
  constructor(private assetRepository: IAssetsRepository) {}

  async execute(data: ICreateAssetDTO): Promise<Asset> {
    const assetExists = await this.assetRepository.findByB3Ticket(
      data.b3_ticket,
    );

    if (assetExists)
      throw new AppError(
        `Já existe um ativo cadastrado com este ticket da B3 ${data.b3_ticket}`,
      );

    const asset = await this.assetRepository.create(data);

    return asset;
  }
}

export { CreateAssetUseCase };
