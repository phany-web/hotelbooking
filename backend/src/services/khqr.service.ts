const { BakongKHQR, khqrData, IndividualInfo } = require("bakong-khqr");

import { AppError } from "../utils/AppError";

export const generateKHQR = async (amount: number) => {
  try {
    const optionalData = {
      currency: khqrData.currency.usd,
      amount,
      billNumber: Date.now().toString(),
      mobileNumber: "",
      storeLabel: "Hotel Booking",
      terminalLabel: "Hotel",
    };

    const individualInfo = new IndividualInfo(
      process.env.BAKONG_ACCOUNT,
      process.env.BAKONG_MERCHANT_NAME,
      process.env.BAKONG_CITY,
      optionalData,
    );

    const khqr = new BakongKHQR();

    const response = khqr.generateIndividual(individualInfo);

    return response.data.qr;
  } catch (error) {
    console.error("KHQR Generate Error:", error);

    throw new AppError("Failed to generate KHQR");
  }
};
