import multer from "multer";
import path from "path";
import fs from "fs";
import { Request, Response } from "express";

const hotelPath = "uploads/hotels";

if (!fs.existsSync(hotelPath)) {
  fs.mkdirSync(hotelPath, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, hotelPath);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

export const upload = multer({
  storage,
});