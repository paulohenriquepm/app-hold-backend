import { UsersWalletAssets } from '.prisma/client';
import { ICreateUsersWalletAssetsDTO } from '../dtos/ICreateUsersWalletAssetsDTO';

interface IUsersWalletAssetsRepository {
  findById(user_wallet_asset_id: number): Promise<UsersWalletAssets>;
  create(data: ICreateUsersWalletAssetsDTO): Promise<UsersWalletAssets>;
  destroy(user_wallet_asset_id: number): Promise<void>;
}

export { IUsersWalletAssetsRepository };
