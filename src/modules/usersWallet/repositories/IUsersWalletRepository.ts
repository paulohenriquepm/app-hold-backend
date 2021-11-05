import { UsersWallet } from '.prisma/client';

interface IUsersWalletRepository {
  findByUserId(user_id: number): Promise<UsersWallet>;
  create(user_id: number): Promise<UsersWallet>;
}

export { IUsersWalletRepository };
