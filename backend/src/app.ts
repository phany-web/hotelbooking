import express from "express";
import cors from "cors";
import helmet from "helmet";


import { errorHandler } from "./middlewares/error.middleware";
const app = express();
import authRoute from "./routes/auth.route";
import adminRoute from "./routes/admin.route";
import hotelRoute from "./routes/hotel.route";
import roomTypeRoute from "./routes/roomType.route";
import roomRoute from "./routes/room.route";
import bookingRoute from "./routes/booking.route";
import paymentRoute from "./routes/payment.route";
import reviewRoute from "./routes/review.route";
import notificationRoute from "./routes/notification.route";
import dashbordRoute from "./routes/dashboard.route";
import staffRoute from "./routes/staff.route";
import advertisementRoute from "./routes/advertisement.route";
import uploadRoute from "./routes/upload.route";
import userRoute from "./routes/user.route";

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/hotel", hotelRoute);
app.use("/api/roomType", roomTypeRoute);
app.use("/api/room", roomRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/review", reviewRoute);
app.use("/api/notification", notificationRoute);
app.use("/api/dashboard", dashbordRoute);
app.use("/api/staff", staffRoute);
app.use("/api/advertisement", advertisementRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/users", userRoute);

app.use(errorHandler);
export default app;
