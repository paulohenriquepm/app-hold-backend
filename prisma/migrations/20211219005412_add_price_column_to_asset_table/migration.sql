/*
  Warnings:

  - Added the required column `price` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "price" FLOAT NOT NULL;
