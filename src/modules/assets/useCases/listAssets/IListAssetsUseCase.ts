import { Asset } from '@prisma/client';

interface IListAssetsUseCase {
  execute(): Promise<Asset[]>;
}

export { IListAssetsUseCase };
