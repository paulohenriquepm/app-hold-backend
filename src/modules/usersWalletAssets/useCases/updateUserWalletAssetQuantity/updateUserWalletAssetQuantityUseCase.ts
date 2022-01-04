import { UsersWalletAssets } from '@prisma/client';

import { IUpdateUserWalletAssetQuantityUseCase } from './IUpdateUserWalletAssetQuantityUseCase';
import { IUsersWalletAssetsRepository } from '@modules/usersWalletAssets/repositories/IUsersWalletAssetsRepository';

class UpdateUserWalletAssetQuantityUseCase
  implements IUpdateUserWalletAssetQuantityUseCase
{
  constructor(
    private usersWalletAssetsRepository: IUsersWalletAssetsRepository,
  ) {}

  async execute(
    user_wallet_asset_id: number,
    quantity: number,
  ): Promise<UsersWalletAssets> {
    const updatedUserWalletAsset =
      await this.usersWalletAssetsRepository.update(user_wallet_asset_id, {
        quantity,
      });

    return updatedUserWalletAsset;
  }
}

export { UpdateUserWalletAssetQuantityUseCase };
