import { Router } from "express";

import * as RoomController from "../controllers/room.controller";

import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", verifyToken, RoomController.create);

router.get("/", RoomController.getAll);
router.get(
  "/my-hotel",
  verifyToken,
  RoomController.getMyHotelRooms,
);

router.get("/hotel/:hotelId", RoomController.getByHotel);

router.get("/:id", RoomController.getOne);

router.patch("/:id", verifyToken, RoomController.update);

router.delete("/:id", verifyToken, RoomController.remove);


export default router;