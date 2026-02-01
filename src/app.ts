import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import prisma from "./config/db.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { requestLogger } from "./middlewares/performance.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

// ⭐ สำคัญมาก
app.use(routes);

app.get("/", (_req, res) => {
    res.json({ status: "ok" });
});

app.get("/db", async (_req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.json({ status: "ok", db: "connected" });
    } catch {
        res.status(500).json({ status: "error", db: "disconnected" });
    }
});

app.use(errorHandler);

export default app;
