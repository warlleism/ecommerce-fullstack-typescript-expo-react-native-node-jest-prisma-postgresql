/*
  Warnings:

  - A unique constraint covering the columns `[requestId]` on the table `RapideMoreRequests` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "RapideRequests" (
    "id" SERIAL NOT NULL,
    "requestId" INTEGER NOT NULL,

    CONSTRAINT "RapideRequests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RapideMoreRequests_requestId_key" ON "RapideMoreRequests"("requestId");

-- AddForeignKey
ALTER TABLE "RapideRequests" ADD CONSTRAINT "RapideRequests_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "RapideProducts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
