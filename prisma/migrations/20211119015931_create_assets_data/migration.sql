-- CreateTable
CREATE TABLE "AssetData" (
    "id" SERIAL NOT NULL,
    "revenue" INTEGER NOT NULL,
    "net_income" INTEGER NOT NULL,
    "dividends_paid" INTEGER NOT NULL,
    "fco" INTEGER NOT NULL,
    "fcf" INTEGER NOT NULL,
    "ebit" INTEGER NOT NULL,
    "cash" INTEGER NOT NULL,
    "equity" INTEGER NOT NULL,
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
