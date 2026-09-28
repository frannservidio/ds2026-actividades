import cors from "cors";
import "dotenv/config";
import express from "express";
import authRouter from "./routes/auth.routes.js";
import autoresRouter from "./routes/autores.routes.js";
import librosRouter from "./routes/libros.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();
const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:5173";

app.use(cors({ origin: [frontendUrl] }));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/libros", librosRouter);
app.use("/api/autores", autoresRouter);
app.use((_req, res) => { res.status(404).json({ error: "Ruta no encontrada" }); });
app.use(errorHandler);

export default app;
