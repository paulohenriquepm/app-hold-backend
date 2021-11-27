import { AssetData } from '@prisma/client';

import { IUpdateAssetDataDTO } from '@modules/assetsData/dtos/IUpdateAssetDataDTO';

interface IUpdateAssetDataUseCase {
  execute(id: number, data: IUpdateAssetDataDTO): Promise<AssetData>;
}

export { IUpdateAssetDataUseCase };
