import { Worker } from "bullmq";
import { performance }
    from "node:perf_hooks";

import { prisma }
    from "../../config/prisma.js";

import { redis }
    from "../../config/redis.js";

import {
    Severity,
    SecurityScanStatus,
    AlertChannel,
    AlertType,
} from "@prisma/client";
import { explainIssue } from "../../services/ai.service.js";

export const securityWorker =
    new Worker(
        "security",

        async (job) => {
            const {
                endpointId,
                scanId,
            } = job.data;

            try {
                const endpoint =
                    await prisma.endpoint.findUnique({
                        where: {
                            id: endpointId,
                        },
                    });

                if (!endpoint) {
                    return;
                }

                const start =
                    performance.now();

                let score = 100;

                const issues = [];

                const url =
                    new URL(
                        endpoint.url
                    );

                // HTTPS

                if (
                    url.protocol !==
                    "https:"
                ) {
                    score -= 20;

                    const ai = await explainIssue(
                        "HTTPS not enabled",
                        "Endpoint does not use HTTPS."
                    );

                    issues.push({
                        securityScanId:
                            scanId,

                        code:
                            "NO_HTTPS",

                        title:
                            "HTTPS not enabled",

                        severity:
                            Severity.HIGH,

                        description:
                            "Endpoint does not use HTTPS.",

                        recommendation:
                            "Enable HTTPS.",

                        aiExplanation:
                            ai.explanation,

                        aiSuggestedFix:
                            ai.fix,
                    });
                }

                const response =
                    await fetch(
                        endpoint.url
                    );

                const headers =
                    response.headers;

                // HSTS

                if (
                    !headers.get(
                        "strict-transport-security"
                    )
                ) {
                    score -= 20;

                    const ai = await explainIssue(
                        "Missing HSTS",
                        "Strict-Transport-Security header missing."
                    );
                    issues.push({
                        securityScanId:
                            scanId,

                        code:
                            "MISSING_HSTS",

                        title:
                            "Missing HSTS",

                        severity:
                            Severity.HIGH,

                        description:
                            "Strict-Transport-Security header missing.",

                        recommendation:
                            "Add HSTS header.",

                        aiExplanation:
                            ai.explanation,

                        aiSuggestedFix:
                            ai.fix,
                    });
                }

                // CSP

                if (
                    !headers.get(
                        "content-security-policy"
                    )
                ) {
                    score -= 10;

                    const ai = await explainIssue(
                        "Missing CSP",
                        "Content-Security-Policy header missing."
                    );

                    issues.push({
                        securityScanId:
                            scanId,

                        code:
                            "MISSING_CSP",

                        title:
                            "Missing CSP",

                        severity:
                            Severity.MEDIUM,

                        description:
                            "Content-Security-Policy missing.",

                        recommendation:
                            "Add CSP header.",

                        aiExplanation:
                            ai.explanation,

                        aiSuggestedFix:
                            ai.fix,
                    });
                }

                // XFO

                if (
                    !headers.get(
                        "x-frame-options"
                    )
                ) {
                    score -= 10;

                    const ai = await explainIssue(
                        "Missing X-Frame-Options",
                        "X-Frame-Options missing."
                    );
                    issues.push({
                        securityScanId:
                            scanId,

                        code:
                            "MISSING_XFO",

                        title:
                            "Missing X-Frame-Options",

                        severity:
                            Severity.MEDIUM,

                        description:
                            "X-Frame-Options missing.",

                        recommendation:
                            "Add X-Frame-Options.",

                        aiExplanation:
                            ai.explanation,

                        aiSuggestedFix:
                            ai.fix,
                    });
                }

                // XCTO

                if (
                    !headers.get(
                        "x-content-type-options"
                    )
                ) {
                    score -= 10;

                    const ai = await explainIssue(
                        "Missing X-Content-Type-Options",
                        "X-Content-Type-Options missing."
                    );
                    issues.push({
                        securityScanId:
                            scanId,

                        code:
                            "MISSING_XCTO",

                        title:
                            "Missing X-Content-Type-Options",

                        severity:
                            Severity.MEDIUM,

                        description:
                            "X-Content-Type-Options missing.",

                        recommendation:
                            "Add nosniff.",

                        aiExplanation:
                            ai.explanation,

                        aiSuggestedFix:
                            ai.fix,
                    });
                }

                // CORS

                const cors =
                    headers.get(
                        "access-control-allow-origin"
                    );

                if (
                    cors === "*"
                ) {
                    score -= 30;

                    const ai = await explainIssue(
                        "Wildcard CORS",
                        "CORS allows all origins."
                    );
                    issues.push({
                        securityScanId:
                            scanId,

                        code:
                            "INSECURE_CORS",

                        title:
                            "Wildcard CORS",

                        severity:
                            Severity.CRITICAL,

                        description:
                            "CORS allows all origins.",

                        recommendation:
                            "Restrict allowed origins.",

                        aiExplanation:
                            ai.explanation,

                        aiSuggestedFix:
                            ai.fix,
                    });
                }

                if (
                    issues.length
                ) {
                    await prisma.securityIssue.createMany(
                        {
                            data: issues,
                        }
                    );

                    const criticalIssues =
                        issues.filter(
                            issue =>
                                issue.severity ===
                                Severity.CRITICAL
                        ).length;

                    if (
                        score < 70 ||
                        criticalIssues > 0
                    ) {
                        await prisma.alert.create({
                            data: {
                                endpointId,

                                securityScanId:
                                    scanId,

                                type:
                                    AlertType.SECURITY,

                                channel:
                                    AlertChannel.DASHBOARD,

                                title:
                                    "Security Risk Detected",

                                message:
                                    `Found ${issues.length} vulnerabilities including ${criticalIssues} critical issue(s). Security score: ${score}/100.`,
                            },
                        });
                    }
                }

                await prisma.securityScan.update({
                    where: {
                        id: scanId,
                    },

                    data: {
                        status:
                            SecurityScanStatus.COMPLETED,

                        score:
                            Math.max(
                                score,
                                0
                            ),

                        scanDuration:
                            Math.round(
                                performance.now() -
                                start
                            ),
                    },
                });

                console.log(
                    "🔐 Security scan completed:",
                    scanId
                );
            }
            catch (error) {

                console.error(error);

                await prisma.securityScan.update({
                    where: {
                        id: scanId,
                    },

                    data: {
                        status:
                            SecurityScanStatus.FAILED,

                        score: 0,
                    },
                });
            }
        },

        {
            connection: {
                host: process.env.REDIS_HOST,
                port: Number(
                    process.env.REDIS_PORT
                ),
            },
        }
    );