import prisma from "../config/prisma";

export const createAuditLog = async (
  userId: string,
  action: string,
  entityType: string,
  entityId: string,
  metadata?: any,
) => {
  return prisma.auditLog.create({
    data: {
      userId,
      action,
      entityType,
      entityId,
      metadata,
    },
  });
};

export const getAuditLogs = async (page = 1, limit = 20) => {
  const skip = (page - 1) * limit;

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      skip,
      take: limit,

      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.auditLog.count(),
  ]);

  return {
    data: logs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

