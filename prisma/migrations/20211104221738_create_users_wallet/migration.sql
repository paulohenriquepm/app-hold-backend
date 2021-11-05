-- CreateTable
CREATE TABLE "UsersWallet" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsersWallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsersWallet_userId_key" ON "UsersWallet"("userId");

-- AddForeignKey
ALTER TABLE "UsersWallet" ADD CONSTRAINT "UsersWallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
