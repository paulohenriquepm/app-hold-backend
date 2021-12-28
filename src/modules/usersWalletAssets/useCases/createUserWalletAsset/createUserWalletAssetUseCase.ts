import { UsersWalletAssets } from '.prisma/client';

import { ICreateUserWalletAssetUseCase } from './ICreateUserWalletAssetUseCase';
import { IUsersWalletAssetsRepository } from '@modules/usersWalletAssets/repositories/IUsersWalletAssetsRepository';
import { ICreateUsersWalletAssetsDTO } from '@modules/usersWalletAssets/dtos/ICreateUsersWalletAssetsDTO';

class CreateUserWalletAssetUseCase implements ICreateUserWalletAssetUseCase {
  constructor(
    private usersWalletAssetsRepository: IUsersWalletAssetsRepository,
  ) {}

  async execute(data: ICreateUsersWalletAssetsDTO): Promise<UsersWalletAssets> {
    const userWalletAssetExists = await this.usersWalletAssetsRepository.create(
      data,
    );

    return userWalletAssetExists;
  }
}

export { CreateUserWalletAssetUseCase };
