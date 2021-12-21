import { UsersWalletAssets } from '.prisma/client';

import { ICreateUsersWalletAssetsUseCase } from './ICreateUsersWalletAssetsUseCase';
import { IUsersWalletAssetsRepository } from '@modules/usersWalletAssets/repositories/IUsersWalletAssetsRepository';
import { ICreateUsersWalletAssetsDTO } from '@modules/usersWalletAssets/dtos/ICreateUsersWalletAssetsDTO';

class CreateUsersWalletAssetsUseCase
  implements ICreateUsersWalletAssetsUseCase
{
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

export { CreateUsersWalletAssetsUseCase };
