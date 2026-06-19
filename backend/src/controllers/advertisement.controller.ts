import { Request, Response } from "express";

import * as AdvertisementService from "../services/advertisement.service";

export const create = async (req: Request, res: Response) => {
  try {
    const { title, imageUrl, targetUrl } = req.body;

    const advertisement = await AdvertisementService.createAdvertisement(
      title,
      imageUrl,
      targetUrl,
    );

    res.status(201).json({
      success: true,
      data: advertisement,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  const advertisements = await AdvertisementService.getAllAdvertisements();

  res.json({
    success: true,
    data: advertisements,
  });
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const advertisement = await AdvertisementService.getAdvertisementById(
      req.params.id as string,
    );

    res.json({
      success: true,
      data: advertisement,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const advertisement = await AdvertisementService.updateAdvertisement(
      req.params.id as string,
      req.body,
    );

    res.json({
      success: true,
      data: advertisement,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const result = await AdvertisementService.deleteAdvertisement(
      req.params.id as string,
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
