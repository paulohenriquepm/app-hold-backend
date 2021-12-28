import { UsersWalletAssets } from '@prisma/client';

import { ICreateUsersWalletAssetsDTO } from '@modules/usersWalletAssets/dtos/ICreateUsersWalletAssetsDTO';

interface ICreateUserWalletAssetUseCase {
  execute(data: ICreateUsersWalletAssetsDTO): Promise<UsersWalletAssets>;
}

export { ICreateUserWalletAssetUseCase };
