import prisma from "../config/prisma";
import { createNotification } from "./notification.service";
export const createReview = async (
  userId: string,
  hotelId: string,
  rating: number,
  comment?: string,
) => {
  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  const hotel = await prisma.hotel.findUnique({
    where: {
      id: hotelId,
    },
  });

  if (!hotel) {
    throw new Error("Hotel not found");
  }

  const review = await prisma.review.create({
    data: {
      userId,
      hotelId,
      rating,
      comment,
    },

    include: {
      user: true,
      hotel: true,
    },
  });
  await createNotification(
    userId,
    "Review Submitted",
    "Thank you for your review.",
  );
  return review;
};

export const getHotelReviews = async (hotelId: string) => {
  return prisma.review.findMany({
    where: {
      hotelId,
    },

    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getAllReviews = async () => {
  return prisma.review.findMany({
    include: {
      user: true,
      hotel: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const deleteReview = async (reviewId: string) => {
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!review) {
    throw new Error("Review not found");
  }

  await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });

  return {
    message: "Review deleted successfully",
  };
};

export const getHotelRating = async (hotelId: string) => {
  const reviews = await prisma.review.findMany({
    where: {
      hotelId,
    },
  });

  if (reviews.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
    };
  }

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);

  return {
    averageRating: total / reviews.length,

    totalReviews: reviews.length,
  };
};

export const getMyHotelReviews = async (hotelId: string) => {
  return prisma.review.findMany({
    where: {
      hotelId,
    },

    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },

      hotel: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};
