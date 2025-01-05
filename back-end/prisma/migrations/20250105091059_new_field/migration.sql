/*
  Warnings:

  - Added the required column `category` to the `RapideProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RapideProducts" ADD COLUMN     "category" TEXT NOT NULL;
