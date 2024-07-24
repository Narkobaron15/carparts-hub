/*
  Warnings:

  - The primary key for the `Seller` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Detail" DROP CONSTRAINT "Detail_seller_id_fkey";

-- DropIndex
DROP INDEX "Seller_user_id_key";

-- AlterTable
ALTER TABLE "Seller" DROP CONSTRAINT "Seller_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Seller_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Detail" ADD CONSTRAINT "Detail_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
