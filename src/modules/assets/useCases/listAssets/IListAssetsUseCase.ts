import { Asset } from '@prisma/client';

interface IListAssetsUseCase {
  execute(searchAsset: string): Promise<Asset[]>;
}

export { IListAssetsUseCase };
