import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import LibroDetalle from "./pages/LibroDetalle";
import LibroNuevo from "./pages/LibroNuevo";
import useFetch from "./hooks/useFetch";
import type { Libro } from "./types/libro";

function App() {
  const [librosAgregados, setLibrosAgregados] = useState<Libro[]>([]);
  const {
    data: librosDesdeMock,
    loading,
    error,
  } = useFetch<Libro[]>("/libros.json");
  const libros = [...(librosDesdeMock ?? []), ...librosAgregados];

  const agregarLibro = (nuevoLibro: Omit<Libro, "id">) => {
    setLibrosAgregados((librosActuales) => {
      const todosLosLibros = [...(librosDesdeMock ?? []), ...librosActuales];
      const ultimoId = todosLosLibros.length
        ? Math.max(...todosLosLibros.map((libro) => libro.id))
        : 0;
      return [...librosActuales, { ...nuevoLibro, id: ultimoId + 1 }];
    });
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home libros={libros} />} />
        <Route
          path="/catalogo"
          element={<Catalogo libros={libros} loading={loading} error={error} />}
        />
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
