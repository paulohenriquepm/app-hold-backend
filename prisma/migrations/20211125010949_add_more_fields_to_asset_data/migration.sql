/*
  Warnings:

  - Added the required column `net_margin` to the `AssetData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payout` to the `AssetData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roe` to the `AssetData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AssetData" ADD COLUMN     "net_margin" INTEGER NOT NULL,
ADD COLUMN     "payout" INTEGER NOT NULL,
ADD COLUMN     "roe" INTEGER NOT NULL;
