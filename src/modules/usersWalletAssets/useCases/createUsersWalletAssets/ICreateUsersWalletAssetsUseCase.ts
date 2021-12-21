import { UsersWalletAssets } from '@prisma/client';

import { ICreateUsersWalletAssetsDTO } from '@modules/usersWalletAssets/dtos/ICreateUsersWalletAssetsDTO';

interface ICreateUsersWalletAssetsUseCase {
  execute(data: ICreateUsersWalletAssetsDTO): Promise<UsersWalletAssets>;
}

export { ICreateUsersWalletAssetsUseCase };
