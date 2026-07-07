import cors from "cors";
import "dotenv/config";
import express from "express";
import pg from "pg";

const { Pool } = pg;

const app = express();
const port = Number(process.env.PORT ?? 3000);
const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:5173";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(cors({ origin: frontendUrl }));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "API Libreria C13 funcionando",
    endpoints: ["/health", "/db-check"],
  });
});

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "api",
    environment: process.env.NODE_ENV ?? "development",
  });
});

app.get("/db-check", async (_req, res, next) => {
  try {
    const result = await pool.query("select now() as now");
    res.json({
      status: "ok",
      database: "connected",
      now: result.rows[0].now,
    });
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({
    status: "error",
    message: "No se pudo completar la operacion",
  });
});

app.listen(port, () => {
  console.log(`API Libreria escuchando en http://localhost:${port}`);
});
