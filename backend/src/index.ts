import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { animeRouter } from "./routes/anime";
import { mangaRouter } from "./routes/manga";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL ?? "http://localhost:3000"
}));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "animanga-hub-backend",
    phase: "1A"
  });
});

app.use("/api/anime", animeRouter);
app.use("/api/manga", mangaRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  console.log(`AniManga Hub API running on http://localhost:${port}`);
});
