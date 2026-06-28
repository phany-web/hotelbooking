import { Response } from "express";
import PDFDocument from "pdfkit";

import { AuthRequest } from "../types/express";

import * as InvoiceService from "../services/invoice.service";

export const downloadInvoice = async (req: AuthRequest, res: Response) => {
  const payment = await InvoiceService.getInvoiceData(
    req.params.paymentId as string,
  );

  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=invoice-${payment.id}.pdf`,
  );

  doc.pipe(res);

  doc.fontSize(24).text("Hotel Invoice");

  doc.moveDown();

  doc.text(`Invoice ID: ${payment.id}`);

  doc.text(`Guest: ${payment.booking.user.fullName}`);

  doc.text(`Email: ${payment.booking.user.email}`);

  doc.text(`Amount: $${payment.amount}`);

  doc.text(`Status: ${payment.paymentStatus}`);

  doc.text(`Payment Date: ${payment.paymentDate}`);

  doc.end();
};
