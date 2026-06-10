import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import LibroDetalle from "./pages/LibroDetalle";
import LibroNuevo from "./pages/LibroNuevo";
import { libros as librosIniciales } from "./data/libros";
import type { Libro } from "./types/libro";

function App() {
  const [libros, setLibros] = useState<Libro[]>(librosIniciales);

  const agregarLibro = (nuevoLibro: Omit<Libro, "id">) => {
    setLibros((librosActuales) => {
      const ultimoId = Math.max(...librosActuales.map((libro) => libro.id));
      return [...librosActuales, { ...nuevoLibro, id: ultimoId + 1 }];
    });
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home libros={libros} />} />
        <Route path="/catalogo" element={<Catalogo libros={libros} />} />
        <Route
          path="/libros/nuevo"
          element={<LibroNuevo onAgregar={agregarLibro} />}
        />
        <Route path="/libros/:id" element={<LibroDetalle libros={libros} />} />
      </Routes>
    </Layout>
  );
}

export default App;
