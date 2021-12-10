import { Asset } from '@prisma/client';

interface IListAssetsUseCase {
  execute(includeAssetData: boolean): Promise<Asset[]>;
}

export { IListAssetsUseCase };
