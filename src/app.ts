import express from "express";
import cors from "cors";
import prisma from "./config/db.js";

export const app = express();

app.use(cors());
app.use(express.json());

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
