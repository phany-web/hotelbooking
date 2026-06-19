import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";
export const createHotel = async (data: any, adminId: string) => {
  const hotel = await prisma.hotel.create({
    data: {
      hotelName: data.hotelName,
      description: data.description,
      address: data.address,
      location: data.location,
      phone: data.phone,
      email: data.email,
      adminId,

      images: {
        create: data.images.map((imageUrl: string) => ({
          imageUrl,
        })),
      },
    },

    include: {
      images: true,
    },
  });

  return hotel;
};

export const getAllHotels = async (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;

  const hotels = await prisma.hotel.findMany({
    skip,
    take: limit,

    include: {
      images: true,

      reviews: {
        select: {
          rating: true,
        },
      },

      admin: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });

  const total = await prisma.hotel.count();

  const formattedHotels = hotels.map((hotel) => {
    const totalReviews = hotel.reviews.length;

    const averageRating =
      totalReviews > 0
        ? Number(
            (
              hotel.reviews.reduce((sum, review) => sum + review.rating, 0) /
              totalReviews
            ).toFixed(1),
          )
        : 0;

    return {
      ...hotel,
      averageRating,
      totalReviews,
    };
  });

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hotels: formattedHotels,
  };
};
export const getHotelById = async (hotelId: string) => {
  const hotel = await prisma.hotel.findUnique({
    where: {
      id: hotelId,
    },

    include: {
      images: true,

      reviews: true,

      admin: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });

  if (!hotel) {
    throw new Error("Hotel not found");
  }

  const totalReviews = hotel.reviews.length;

  const averageRating =
    totalReviews > 0
      ? Number(
          (
            hotel.reviews.reduce((sum, review) => sum + review.rating, 0) /
            totalReviews
          ).toFixed(1),
        )
      : 0;

  return {
    ...hotel,
    averageRating,
    totalReviews,
  };
};

export const updateHotel = async (hotelId: string, data: any) => {
  const hotel = await prisma.hotel.findUnique({
    where: { id: hotelId },
  });
  if (!hotel) {
    throw new AppError("Hotel not found", 404);
  }

  const updatedHotel = await prisma.hotel.update({
    where: {
      id: hotelId,
    },

    data: {
      hotelName: data.hotelName,
      description: data.description,
      address: data.address,
      location: data.location,
      phone: data.phone,
      email: data.email,
    },

    include: {
      images: true,
    },
  });

  return updatedHotel;
};

export const deleteHotel = async (hotelId: string) => {
  const hotel = await prisma.hotel.findUnique({
    where: { id: hotelId },
  });

  if (!hotel) {
    throw new AppError("Hotel not found", 404);
  }

  await prisma.hotel.delete({
    where: {
      id: hotelId,
    },
  });

  return {
    message: "Hotel deleted successfully",
  };
};

export const searchHotels = async (
  hotelName?: string,
  location?: string,
  minPrice?: number,
  maxPrice?: number,
) => {
  return prisma.hotel.findMany({
    where: {
      AND: [
        hotelName
          ? {
              hotelName: {
                contains: hotelName,
              },
            }
          : {},

        location
          ? {
              location: {
                contains: location,
              },
            }
          : {},

        minPrice || maxPrice
          ? {
              rooms: {
                some: {
                  price: {
                    ...(minPrice && {
                      gte: minPrice,
                    }),

                    ...(maxPrice && {
                      lte: maxPrice,
                    }),
                  },
                },
              },
            }
          : {},
      ],
    },

    include: {
      rooms: {
        include: {
          roomType: true,
        },
      },

      reviews: true,
    },
  });
};

export const getTopHotels = async () => {
  const result = await getAllHotels(1, 1000);

  return result.hotels
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 10);
};
