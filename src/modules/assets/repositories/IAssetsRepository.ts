import { Asset } from '.prisma/client';

import { ICreateAssetDTO } from '../dtos/ICreateWalletDTO';

interface IAssetsRepository {
  create(data: ICreateAssetDTO): Promise<Asset>;
}

export { IAssetsRepository };
