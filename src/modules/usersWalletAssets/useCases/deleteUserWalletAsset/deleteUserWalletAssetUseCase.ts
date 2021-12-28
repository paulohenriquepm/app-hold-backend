import { IDeleteUserWalletAssetUseCase } from './IDeleteUserWalletAssetUseCase';
import { IUsersWalletAssetsRepository } from '@modules/usersWalletAssets/repositories/IUsersWalletAssetsRepository';

class DeleteUserWalletAssetUseCase implements IDeleteUserWalletAssetUseCase {
  constructor(
    private usersWalletAssetsRepository: IUsersWalletAssetsRepository,
  ) {}

  async execute(user_wallet_asset_id: number): Promise<void> {
    await this.usersWalletAssetsRepository.destroy(user_wallet_asset_id);
  }
}

export { DeleteUserWalletAssetUseCase };
