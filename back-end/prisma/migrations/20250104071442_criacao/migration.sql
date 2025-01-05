/*
  Warnings:

  - You are about to drop the `Rapide` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Rapide";

-- CreateTable
CREATE TABLE "RapideProducts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "enterprise" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RapideProducts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoreRequest" (
    "id" SERIAL NOT NULL,
    "requestId" INTEGER NOT NULL,

    CONSTRAINT "MoreRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MoreRequest" ADD CONSTRAINT "MoreRequest_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "RapideProducts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
