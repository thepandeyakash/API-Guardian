import { prisma } from "../../config/prisma.js";
import { ApiError } from "../../utils/apiError.js";
import { securityQueue } from "../../jobs/queues/security.queue.js";

export async function startScan(
    userId: string,
    endpointId: string
) {
    const endpoint =
        await prisma.endpoint.findFirst({
            where: {
                id: endpointId,
                project: {
                    userId,
                },
            },
        });

    if (!endpoint)
        throw new ApiError(
            "Endpoint not found",
            404
        );

    const scan =
        await prisma.securityScan.create({
            data: {
                endpointId,
            },
        });

    await securityQueue.add(
        "security-scan",
        {
            endpointId,
            scanId: scan.id,
        }
    );

    return scan;
}