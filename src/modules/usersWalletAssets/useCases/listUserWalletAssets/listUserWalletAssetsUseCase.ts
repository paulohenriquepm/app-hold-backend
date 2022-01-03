import { UsersWalletAssets } from '.prisma/client';

import { IListUserWalletAssetsUseCase } from './IListUserWalletAssetsUseCase';
import { IUsersWalletAssetsRepository } from '@modules/usersWalletAssets/repositories/IUsersWalletAssetsRepository';

class ListUserWalletAssetsUseCase implements IListUserWalletAssetsUseCase {
  constructor(
    private usersWalletAssetsRepository: IUsersWalletAssetsRepository,
  ) {}

  async execute(user_wallet_id: number): Promise<UsersWalletAssets[]> {
    const userWalletAssets =
      await this.usersWalletAssetsRepository.listByUserWalletId(user_wallet_id);

    return userWalletAssets;
  }
}

export { ListUserWalletAssetsUseCase };
