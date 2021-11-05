import { Asset } from '@prisma/client';

import prisma from '@shared/db/prisma';

import { IAssetsRepository } from '../IAssetsRepository';
import { ICreateAssetDTO } from '@modules/assets/dtos/ICreateWalletDTO';

class AssetsRepository implements IAssetsRepository {
  async create(data: ICreateAssetDTO): Promise<Asset> {
    const asset = await prisma.asset.create({
      data,
    });

    return asset;
  }
}

export { AssetsRepository };
