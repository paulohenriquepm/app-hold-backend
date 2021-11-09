import { Asset } from '@prisma/client';

import { ICreateAssetDTO } from '@modules/assets/dtos/ICreateAssetDTO';

interface ICreateAssetUseCase {
  execute(data: ICreateAssetDTO): Promise<Asset>;
}

export { ICreateAssetUseCase };
