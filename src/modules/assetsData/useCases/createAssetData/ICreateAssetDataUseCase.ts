import { AssetData } from '.prisma/client';

import { ICreateAssetDataDTO } from '@modules/assetsData/dtos/ICreateAssetDataDTO';

interface ICreateAssetDataUseCase {
  execute(data: ICreateAssetDataDTO): Promise<AssetData>;
}

export { ICreateAssetDataUseCase };
