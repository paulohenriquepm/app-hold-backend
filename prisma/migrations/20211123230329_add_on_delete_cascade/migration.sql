-- DropForeignKey
ALTER TABLE "AssetData" DROP CONSTRAINT "AssetData_assetId_fkey";

-- DropForeignKey
ALTER TABLE "UsersWallet" DROP CONSTRAINT "UsersWallet_userId_fkey";

-- AddForeignKey
ALTER TABLE "UsersWallet" ADD CONSTRAINT "UsersWallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetData" ADD CONSTRAINT "AssetData_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;
