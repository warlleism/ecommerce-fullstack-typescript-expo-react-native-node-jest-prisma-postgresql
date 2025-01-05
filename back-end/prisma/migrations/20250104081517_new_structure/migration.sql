/*
  Warnings:

  - You are about to drop the column `requestId` on the `RapideMoreRequests` table. All the data in the column will be lost.
  - The primary key for the `RapideProducts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `RapideProducts` table. All the data in the column will be lost.
  - You are about to drop the column `requestId` on the `RapideRequests` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[requestproductid]` on the table `RapideMoreRequests` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `requestproductid` to the `RapideMoreRequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requestproductid` to the `RapideRequests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RapideMoreRequests" DROP CONSTRAINT "RapideMoreRequests_requestId_fkey";

-- DropForeignKey
ALTER TABLE "RapideRequests" DROP CONSTRAINT "RapideRequests_requestId_fkey";

-- DropIndex
DROP INDEX "RapideMoreRequests_requestId_key";

-- AlterTable
ALTER TABLE "RapideMoreRequests" DROP COLUMN "requestId",
ADD COLUMN     "requestproductid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RapideProducts" DROP CONSTRAINT "RapideProducts_pkey",
DROP COLUMN "id",
ADD COLUMN     "productid" SERIAL NOT NULL,
ADD CONSTRAINT "RapideProducts_pkey" PRIMARY KEY ("productid");

-- AlterTable
ALTER TABLE "RapideRequests" DROP COLUMN "requestId",
ADD COLUMN     "requestproductid" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RapideMoreRequests_requestproductid_key" ON "RapideMoreRequests"("requestproductid");

-- AddForeignKey
ALTER TABLE "RapideRequests" ADD CONSTRAINT "RapideRequests_requestproductid_fkey" FOREIGN KEY ("requestproductid") REFERENCES "RapideProducts"("productid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RapideMoreRequests" ADD CONSTRAINT "RapideMoreRequests_requestproductid_fkey" FOREIGN KEY ("requestproductid") REFERENCES "RapideProducts"("productid") ON DELETE RESTRICT ON UPDATE CASCADE;
