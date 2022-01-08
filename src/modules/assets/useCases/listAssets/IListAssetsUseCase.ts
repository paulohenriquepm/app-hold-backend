import { Asset } from '@prisma/client';

import { IListAssetsFilters } from './listAssetsController';

interface IListAssetsUseCase {
  execute(filters: IListAssetsFilters): Promise<Asset[]>;
}

export { IListAssetsUseCase };
