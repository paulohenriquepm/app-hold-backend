import { Asset } from '@prisma/client';

import { IUpdateAssetDTO } from '@modules/assets/dtos/IUpdateAssetDTO';

interface IUpdateAssetUseCase {
  execute(asset_id: number, data: IUpdateAssetDTO): Promise<Asset>;
}

export { IUpdateAssetUseCase };
