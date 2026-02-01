import express from "express";
import cors from "cors";
import routes from './routes/index.js';
import prisma from "./config/db.js";
import { errorHandler } from "./middlewares/error.middleware.js";

import { requestLogger } from "./middlewares/performance.middleware.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api', routes);

app.get("/", (_req, res) => {
    res.json({ status: "ok" });
});

// test
app.get('/api/db', async (req, res) => {
    try {
        // query เช็คการเชื่อมต่อ
        await prisma.$queryRaw`SELECT 1`;
        res.json({
            status: 'ok',
            db: 'connected'
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'error',
            db: 'disconnected'
        });
    }
});


app.get("/", (_req, res) => {
    res.send("API OK");
});

app.use(errorHandler);