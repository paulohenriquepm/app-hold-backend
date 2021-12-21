-- CreateTable
CREATE TABLE "UsersWalletAssets" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "assetId" INTEGER NOT NULL,
    "userWalletId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsersWalletAssets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsersWalletAssets" ADD CONSTRAINT "UsersWalletAssets_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersWalletAssets" ADD CONSTRAINT "UsersWalletAssets_userWalletId_fkey" FOREIGN KEY ("userWalletId") REFERENCES "UsersWallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
