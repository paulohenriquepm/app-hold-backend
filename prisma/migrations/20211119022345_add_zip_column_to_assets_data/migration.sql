/*
  Warnings:

  - Added the required column `zip` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "zip" TEXT NOT NULL;
