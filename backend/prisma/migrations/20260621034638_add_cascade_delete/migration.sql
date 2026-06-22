-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_hotelId_fkey";

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
