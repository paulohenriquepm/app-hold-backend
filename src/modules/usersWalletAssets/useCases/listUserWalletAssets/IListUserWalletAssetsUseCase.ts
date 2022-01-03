import { UsersWalletAssets } from '@prisma/client';

interface IListUserWalletAssetsUseCase {
  execute(user_wallet_id: number): Promise<UsersWalletAssets[]>;
}

export { IListUserWalletAssetsUseCase };
