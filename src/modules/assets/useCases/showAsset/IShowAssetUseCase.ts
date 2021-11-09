import { Asset } from '@prisma/client';

interface IShowAssetUseCase {
  execute(asset_id: number): Promise<Asset>;
}

export { IShowAssetUseCase };
