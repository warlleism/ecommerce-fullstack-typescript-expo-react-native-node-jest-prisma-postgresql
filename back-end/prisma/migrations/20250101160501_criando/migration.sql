/*
  Warnings:

  - You are about to drop the column `address` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `platform` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `technologies` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Job` table. All the data in the column will be lost.
  - Added the required column `image` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "address",
DROP COLUMN "phone",
DROP COLUMN "platform",
DROP COLUMN "technologies",
DROP COLUMN "title",
DROP COLUMN "url",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "logo" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
