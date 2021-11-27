-- CreateTable
CREATE TABLE "AssetData" (
    "id" SERIAL NOT NULL,
    "revenue" BIGINT NOT NULL,
    "net_income" BIGINT NOT NULL,
    "dividends_paid" BIGINT NOT NULL,
    "fco" BIGINT NOT NULL,
    "fcf" BIGINT NOT NULL,
    "ebit" BIGINT NOT NULL,
    "cash" BIGINT NOT NULL,
    "equity" BIGINT NOT NULL,
    "year" INTEGER NOT NULL,
    "quarter" INTEGER NOT NULL,
    "assetId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssetData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssetData_assetId_key" ON "AssetData"("assetId");

-- AddForeignKey
ALTER TABLE "AssetData" ADD CONSTRAINT "AssetData_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
