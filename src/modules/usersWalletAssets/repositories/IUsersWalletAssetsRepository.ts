import { Prisma } from '@prisma/client';

import { UsersWalletAssets } from '.prisma/client';
import { ICreateUsersWalletAssetsDTO } from '../dtos/ICreateUsersWalletAssetsDTO';
import { IUpdateUsersWalletAssetDTO } from '../dtos/IUpdateUsersWalletAssetDTO';

interface IUsersWalletAssetsRepository {
  listByUserWalletId(user_wallet_id: number): Promise<UsersWalletAssets[]>;
  findById(user_wallet_asset_id: number): Promise<UsersWalletAssets>;
  findByUserWalletIdAndAssetId(
    user_wallet_id: number,
    asset_id: number,
  ): Promise<UsersWalletAssets>;
  create(data: ICreateUsersWalletAssetsDTO): Promise<UsersWalletAssets>;
  createMany(data: ICreateUsersWalletAssetsDTO[]): Promise<Prisma.BatchPayload>;
  update(
    user_wallet_asset_id: number,
    data: IUpdateUsersWalletAssetDTO,
  ): Promise<UsersWalletAssets>;
  destroy(user_wallet_asset_id: number): Promise<void>;
}

export { IUsersWalletAssetsRepository };
