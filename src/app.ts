import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import prisma from "./config/db.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { requestLogger } from "./middlewares/performance.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

//  CORS ต้องมาก่อน routes
app.use(
    cors({
        origin:process.env.CLIENT_URL || "http://localhost:3000",
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());      // ⭐ ต้องอยู่ก่อน auth middleware
app.use(requestLogger);

// ⭐ routes
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
