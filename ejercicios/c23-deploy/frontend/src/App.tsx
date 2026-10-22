import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/PrivateRoute";
import SinPermiso from "./pages/SinPermiso";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import LibroDetalle from "./pages/LibroDetalle";
import LibroNuevo from "./pages/LibroNuevo";
import useFetch from "./hooks/useFetch";
import type { Libro } from "./types/libro";

function App() {
  const [revision, setRevision] = useState(0);
  const { data, loading, error } = useFetch<Libro[]>(`/libros?revision=${revision}`);
  const libros = data ?? [];
  const agregarLibro = () => setRevision((valor) => valor + 1);

  return (
    <Layout>
      <Routes>
        <Route path="/sin-permiso" element={<SinPermiso />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home libros={libros} />} />
        <Route
          path="/catalogo"
          element={<Catalogo libros={libros} loading={loading} error={error} />}
        />
        <Route element={<PrivateRoute rol="ADMIN" />}>
          <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
        </Route>
        <Route path="/libros/:id" element={<LibroDetalle />} />
      </Routes>
    </Layout>
  );
}

export default App;
