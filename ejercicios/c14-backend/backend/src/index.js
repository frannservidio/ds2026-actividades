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

const libros = [
  {
    id: 1,
    titulo: "Deja de ser tu",
    autor: "Joe Dispenza",
    precio: "$15.900",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-RXJiImQaE2MXBM7haLVJ_XdNu1olqCmeqQ&s",
    descripcion:
      "En este libro, Joe Dispenza combina los campos de la fisica cuantica, la neurociencia y la biologia para mostrarte como cambiar tu mente y crear la vida que deseas.",
    destacado: true,
    disponible: true,
  },
  {
    id: 2,
    titulo: "Historias de divan",
    autor: "Gabriel Rolon",
    precio: "$12.500",
    imagen:
      "https://sbslibreria.vtexassets.com/arquivos/ids/5122700-1200-auto?v=638872526094230000&width=1200&height=auto&aspect=true",
    descripcion:
      "Gabriel Rolon nos abre las puertas de su consultorio y comparte ocho historias reales de pacientes que llegaron a terapia buscando respuestas.",
    destacado: true,
    disponible: true,
  },
  {
    id: 3,
    titulo: "El placebo eres tu",
    autor: "Joe Dispenza",
    precio: "$16.200",
    imagen:
      "https://sbslibreria.vtexassets.com/arquivos/ids/5704093-1200-auto?v=639120317790930000&width=1200&height=auto&aspect=true",
    descripcion:
      "Joe Dispenza explora el poder de la mente sobre el cuerpo y presenta evidencia cientifica de como los pensamientos y las emociones pueden transformar nuestra biologia.",
    destacado: true,
    disponible: true,
  },
  {
    id: 4,
    titulo: "Encuentros",
    autor: "Gabriel Rolon",
    precio: "$13.800",
    imagen:
      "https://imgs.search.brave.com/0oMKhFkRoDnukTJXrYmdqfbz6isZR0T66cLXPJCqOfc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/XzY1Mjg4Ny1NTFU3/NjEwMjQxODAwMV8w/NDIwMjQtVi53ZWJw",
    descripcion:
      "Rolon reflexiona sobre el amor, el deseo y los vinculos humanos a partir de relatos clinicos y referencias culturales.",
    destacado: true,
    disponible: true,
  },
  {
    id: 5,
    titulo: "Habitos atomicos",
    autor: "James Clear",
    precio: "$14.500",
    imagen:
      "https://http2.mlstatic.com/D_NQ_NP_2X_937573-MLU74994004700_032024-F.webp",
    descripcion:
      "James Clear presenta un sistema probado para construir buenos habitos y eliminar los malos.",
    destacado: true,
    disponible: true,
  },
  {
    id: 6,
    titulo: "El club de las 5 de la manana",
    autor: "Robin Sharma",
    precio: "$11.900",
    imagen:
      "https://http2.mlstatic.com/D_NQ_NP_2X_780462-MLU71630135141_092023-F.webp",
    descripcion:
      "Robin Sharma propone una rutina matutina revolucionaria para maximizar la productividad y alcanzar el bienestar.",
    destacado: true,
    disponible: true,
  },
];

app.use(cors({ origin: frontendUrl }));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "API Libreria C14 funcionando",
    endpoints: ["/health", "/db-check", "/libros"],
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

app.get("/libros", (_req, res) => {
  res.json(libros);
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
