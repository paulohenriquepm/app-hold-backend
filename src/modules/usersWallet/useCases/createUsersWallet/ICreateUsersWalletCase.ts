import { UsersWallet } from '@prisma/client';

interface ICreateUsersWalletUseCase {
  execute(data_id: number): Promise<UsersWallet>;
}

export { ICreateUsersWalletUseCase };
