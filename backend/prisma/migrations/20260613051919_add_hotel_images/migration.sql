-- CreateTable
CREATE TABLE "hotel_images" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hotel_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "hotel_images" ADD CONSTRAINT "hotel_images_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
