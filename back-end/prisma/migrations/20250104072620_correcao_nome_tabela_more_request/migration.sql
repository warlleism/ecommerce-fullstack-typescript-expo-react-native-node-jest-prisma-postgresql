/*
  Warnings:

  - You are about to drop the `MoreRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MoreRequest" DROP CONSTRAINT "MoreRequest_requestId_fkey";

-- DropTable
DROP TABLE "MoreRequest";

-- CreateTable
CREATE TABLE "RapideMoreRequest" (
    "id" SERIAL NOT NULL,
    "requestId" INTEGER NOT NULL,

    CONSTRAINT "RapideMoreRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RapideMoreRequest" ADD CONSTRAINT "RapideMoreRequest_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "RapideProducts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
