import { Asset } from '@prisma/client';

interface IListAssetsUseCase {
  execute(includeAssetData: boolean, searchAsset: string): Promise<Asset[]>;
}

export { IListAssetsUseCase };
