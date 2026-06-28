import { AlertStatus } from "@prisma/client";

import { prisma }
from "../../config/prisma.js";

import { ApiError }
from "../../utils/apiError.js";

export async function getAlerts(
    userId: string
) {
    return prisma.alert.findMany({
        where: {
            readAt: null,

            endpoint: {
                project: {
                    userId,
                },
            },
        },

        include: {
            endpoint: {
                select: {
                    name: true,
                },
            },
        },

        orderBy: {
            createdAt:
                "desc",
        },
    });
}

export async function markAsRead(
    userId: string,
    alertId: string
) {
    const alert =
        await prisma.alert.findFirst({
            where: {
                id: alertId,

                endpoint: {
                    project: {
                        userId,
                    },
                },
            },
        });

    if (!alert) {
        throw new ApiError(
            "Alert not found",
            404
        );
    }

    return prisma.alert.update({
        where: {
            id: alertId,
        },

        data: {
            readAt:
                new Date(),

            status:
                AlertStatus.SENT,
        },
    });
}