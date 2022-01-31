/*
  Warnings:

  - You are about to drop the column `last_time_data_updated` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `last_time_price_updated` on the `Asset` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "last_time_data_updated",
DROP COLUMN "last_time_price_updated";
