-- CreateTable
CREATE TABLE "UsersForgotPasswordTokens" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsersForgotPasswordTokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsersForgotPasswordTokens_userId_key" ON "UsersForgotPasswordTokens"("userId");

-- AddForeignKey
ALTER TABLE "UsersForgotPasswordTokens" ADD CONSTRAINT "UsersForgotPasswordTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
