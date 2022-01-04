import prisma from '@shared/db/prisma';
import 'reflect-metadata';

const dropDatabase = () => {
  return Promise.all([
    prisma.usersWalletAssets.deleteMany(),
    prisma.assetData.deleteMany(),
    prisma.asset.deleteMany(),
    prisma.usersWallet.deleteMany(),
    prisma.user.deleteMany(),
  ]);
};

beforeEach(async () => {
  await dropDatabase();
});

afterEach(async () => {
  prisma.$disconnect;
});
