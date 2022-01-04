import { UsersWalletAssets } from '@prisma/client';

interface IUpdateUserWalletAssetQuantityUseCase {
  execute(
    user_wallet_asset_id: number,
    quantity: number,
  ): Promise<UsersWalletAssets>;
}

export { IUpdateUserWalletAssetQuantityUseCase };
