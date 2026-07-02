import app from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./config/prisma.js";

// import "./config/redis.js";
import { startMonitoringScheduler } from "./jobs/schedulers/monitoring.scheduler.js";
// import "./jobs/workers/monitoring.worker.js";

// import "./jobs/workers/security.worker.js";

async function startServer() {
  try {
    await prisma.$connect();

    console.log("✅ Database connected");

    const server = app.listen(env.PORT, () => {
      console.log(`🚀 Server running on port ${env.PORT}`);
      // startMonitoringScheduler();
    });

    return server;
  } catch (error) {
    console.error("❌ Failed to start server");
    console.error(error);

    process.exit(1);
  }
}

startServer();