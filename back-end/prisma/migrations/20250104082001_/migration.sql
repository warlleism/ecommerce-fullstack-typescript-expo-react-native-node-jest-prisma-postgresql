/*
  Warnings:

  - You are about to drop the `RapideMoreRequests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RapideMoreRequests" DROP CONSTRAINT "RapideMoreRequests_requestproductid_fkey";

-- DropTable
DROP TABLE "RapideMoreRequests";
