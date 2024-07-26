-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_manufacturer_id_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_detail_id_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Detail" DROP CONSTRAINT "Detail_car_id_fkey";

-- DropForeignKey
ALTER TABLE "Detail" DROP CONSTRAINT "Detail_manufacturer_id_fkey";

-- DropForeignKey
ALTER TABLE "Detail" DROP CONSTRAINT "Detail_seller_id_fkey";

-- DropForeignKey
ALTER TABLE "Seller" DROP CONSTRAINT "Seller_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_manufacturer_id_fkey" FOREIGN KEY ("manufacturer_id") REFERENCES "Manufacturer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail" ADD CONSTRAINT "Detail_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail" ADD CONSTRAINT "Detail_manufacturer_id_fkey" FOREIGN KEY ("manufacturer_id") REFERENCES "Manufacturer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail" ADD CONSTRAINT "Detail_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_detail_id_fkey" FOREIGN KEY ("detail_id") REFERENCES "Detail"("id") ON DELETE CASCADE ON UPDATE CASCADE;
