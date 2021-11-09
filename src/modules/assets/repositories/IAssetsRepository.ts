import { Asset } from '.prisma/client';

import { ICreateAssetDTO } from '../dtos/ICreateAssetDTO';
import { IUpdateAssetDTO } from '../dtos/IUpdateAssetDTO';

interface IAssetsRepository {
  create(data: ICreateAssetDTO): Promise<Asset>;
  update(asset_id: number, data: IUpdateAssetDTO): Promise<Asset>;
  findById(asset_id: number): Promise<Asset>;
  findByB3Ticket(b3_ticket: string): Promise<Asset>;
}

export { IAssetsRepository };
