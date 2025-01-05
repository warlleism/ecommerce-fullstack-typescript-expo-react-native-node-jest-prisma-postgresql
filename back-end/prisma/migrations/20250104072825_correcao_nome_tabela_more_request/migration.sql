/*
  Warnings:

  - You are about to drop the `RapideMoreRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RapideMoreRequest" DROP CONSTRAINT "RapideMoreRequest_requestId_fkey";

-- DropTable
DROP TABLE "RapideMoreRequest";

-- CreateTable
CREATE TABLE "RapideMoreRequests" (
    "id" SERIAL NOT NULL,
    "requestId" INTEGER NOT NULL,

    CONSTRAINT "RapideMoreRequests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RapideMoreRequests" ADD CONSTRAINT "RapideMoreRequests_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "RapideProducts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
