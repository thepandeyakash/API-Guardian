import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import projectRoutes from "./modules/project/project.routes.js";
import endpointRoutes from "./modules/endpoint/endpoint.routes.js";
import monitoringRoutes from "./modules/monitoring/monitoring.routes.js";
import securityRoutes from "./modules/security/security.routes.js";

import testRoutes from "./routes/test.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);

app.get("/", (req, res) => {
  res.send("API Guardian backend working.");
});

app.use(
  "/api/v1/endpoints",
  endpointRoutes
);

app.use(
    "/api/v1/monitoring",
    monitoringRoutes
);

app.use(
    "/api/v1/security",
    securityRoutes
);

app.use("/test", testRoutes);


app.use(errorMiddleware);
export default app;