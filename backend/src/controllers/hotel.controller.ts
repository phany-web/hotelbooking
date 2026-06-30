import { Request, Response } from "express";
import * as HotelService from "../services/hotel.service";
import prisma from "../config/prisma";
import {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
} from "../services/hotel.service";
import { AuthRequest } from "../types/express";
export const create = async (req: AuthRequest, res: Response) => {
  try {
    const adminId = req.user?.userId;

    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const hotel = await createHotel(req.body, adminId);

    return res.status(201).json({
      success: true,
      data: hotel,
    });
  } catch (error: any) {
    console.log("DELETE HOTEL ERROR:");
    console.log(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const adminId = req.user?.userId;

    const hotels = await getAllHotels(adminId, page, limit);

    return res.status(200).json({
      success: true,
      ...hotels,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOne = async (
  req: Request,
  res: Response
) => {
  try {
    const hotel = await prisma.hotel.findUnique({
      where: {
        id: req.params.id as string,
      },

      include: {
        images: true,

        rooms: {
          include: {
            roomType: true,
          },
        },

        reviews: {
          include: {
            user: {
              select: {
                fullName: true,
              },
            },
          },
        },
      },
    });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    const ratings =
      hotel.reviews.map(
        (review) => review.rating
      );

    const prices =
      hotel.rooms.map((room) =>
        Number(room.price)
      );

    const averageRating =
      ratings.length > 0
        ? ratings.reduce(
            (a, b) => a + b,
            0
          ) / ratings.length
        : 0;

    const startingPrice =
      prices.length > 0
        ? Math.min(...prices)
        : 0;

    return res.json({
      success: true,

      data: {
        ...hotel,

        averageRating,

        reviewCount:
          hotel.reviews.length,

        startingPrice,
      },
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const update = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;

    const hotel = await updateHotel(id, req.body);

    return res.status(200).json({
      success: true,
      data: hotel,
    });
  } catch (error: any) {
    console.log("DELETE HOTEL ERROR:");
    console.log(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const remove = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;

    const result = await deleteHotel(id);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.log("DELETE HOTEL ERROR:");
    console.log(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const search = async (req: Request, res: Response) => {
  try {
    const { hotelName, location, minPrice, maxPrice } = req.query;

    const hotels = await HotelService.searchHotels(
      hotelName as string,
      location as string,
      minPrice ? Number(minPrice) : undefined,
      maxPrice ? Number(maxPrice) : undefined,
    );

    res.status(200).json({
      success: true,
      total: hotels.length,
      data: hotels,
    });
  } catch (error: any) {
    console.log("DELETE HOTEL ERROR:");
    console.log(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const topHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await HotelService.getTopHotels();

    return res.status(200).json({
      success: true,
      message: "Top hotels fetched successfully",
      data: hotels,
    });
  } catch (error: any) {
    console.log("DELETE HOTEL ERROR:");
    console.log(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyHotels = async (req: AuthRequest, res: Response) => {
  const hotels = await prisma.hotel.findMany({
    where: {
      adminId: req.user!.userId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  res.json({
    success: true,
    data: hotels,
  });
};

export const getPublicHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await prisma.hotel.findMany({
      include: {
        images: true,
        reviews: true,
        rooms: true,
      },
    });

    const formatted = hotels.map((hotel) => {
      const prices = hotel.rooms.map((r) => Number(r.price));

      const ratings = hotel.reviews.map((r) => r.rating);

      return {
        id: hotel.id,
        hotelName: hotel.hotelName,
        location: hotel.location,
        address: hotel.address,

        thumbnail: hotel.images[0]?.imageUrl || "https://placehold.co/600x400",

        startingPrice: prices.length > 0 ? Math.min(...prices) : 0,

        rating:
          ratings.length > 0
            ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
            : 0,

        reviewCount: ratings.length,

        availableRooms: hotel.rooms.filter(
          (room) => room.status === "AVAILABLE",
        ).length,
      };
    });

    return res.json({
      success: true,
      data: formatted,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
