import { UsersWalletAssets } from '.prisma/client';
import { ICreateUsersWalletAssetsDTO } from '../dtos/ICreateUsersWalletAssetsDTO';

interface IUsersWalletAssetsRepository {
  create(data: ICreateUsersWalletAssetsDTO): Promise<UsersWalletAssets>;
}

export { IUsersWalletAssetsRepository };
