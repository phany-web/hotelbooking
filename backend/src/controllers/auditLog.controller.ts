import { Response } from "express";
import { AuthRequest } from "../types/express";

import * as AuditLogService from "../services/auditLog.service";

export const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const logs = await AuditLogService.getAuditLogs(page, limit);

    res.status(200).json({
      success: true,
      ...logs,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
