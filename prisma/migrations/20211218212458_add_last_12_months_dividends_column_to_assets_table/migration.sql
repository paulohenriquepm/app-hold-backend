/*
  Warnings:

  - Added the required column `last_12_months_dividends` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "last_12_months_dividends" BIGINT NOT NULL;
