/*
  Warnings:

  - Added the required column `total_stocks` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "total_stocks" BIGINT NOT NULL;
