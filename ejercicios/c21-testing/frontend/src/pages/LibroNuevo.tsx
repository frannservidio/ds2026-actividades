import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  libroSchema,
  type LibroFormValues,
  type LibroValidado,
} from "../schemas/libroSchema";
import { useState } from "react";
import type { Autor, LibroDetalle } from "../types/libro";
import useFetch from "../hooks/useFetch";
import { apiFetch } from "../services/api";

const IMG_PLACEHOLDER = "https://placehold.co/300x400?text=Libro";

type LibroNuevoProps = {
  onAgregar: () => void;
};

function LibroNuevo({ onAgregar }: LibroNuevoProps) {
  const [error, setError] = useState<string | null>(null);
  const { data: autores, loading, error: errorAutores } = useFetch<Autor[]>("/autores");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LibroFormValues, unknown, LibroValidado>({
    resolver: zodResolver(libroSchema),
    defaultValues: {
      titulo: "",
      autorId: 0,
      precio: 0,
      descripcion: "",
      disponible: true,
    },
  });

  const onSubmit = async (data: LibroValidado) => {
    setError(null);
    try {
      await apiFetch<LibroDetalle>("/libros", { method: "POST", body: JSON.stringify({ ...data, imagen: IMG_PLACEHOLDER, destacado: false }) });
      onAgregar();
      navigate("/catalogo");
    } catch (err) { setError(err instanceof Error ? err.message : "No se pudo crear el libro"); }
  };

  return (
    <Container className="py-5">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto"
        style={{ maxWidth: 560 }}
      >
        <div className="mb-4">
          <h1 className="fw-bold">Nuevo libro</h1>
          <p className="text-muted mb-0">
            Completa los datos para sumar un libro al catalogo.
          </p>
        </div>

        <Form.Group className="mb-3" controlId="titulo">
          <Form.Label>Titulo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Rayuela"
            isInvalid={!!errors.titulo}
            {...register("titulo")}
          />
          <Form.Control.Feedback type="invalid">
            {errors.titulo?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="autorId">
          <Form.Label>Autor</Form.Label>
          <Form.Select {...register("autorId", { valueAsNumber: true })} isInvalid={!!errors.autorId} disabled={loading}>
            <option value={0}>Selecciona un autor</option>
            {autores?.map((autor) => <option key={autor.id} value={autor.id}>{autor.nombre}</option>)}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.autorId?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="precio">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            min="0"
            step="1"
            placeholder="Ej: 15000"
            isInvalid={!!errors.precio}
            {...register("precio", { valueAsNumber: true })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.precio?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="descripcion">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Breve descripcion del libro"
            isInvalid={!!errors.descripcion}
            {...register("descripcion")}
          />
          <Form.Control.Feedback type="invalid">
            {errors.descripcion?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Check
          className="mb-4"
          type="checkbox"
          label="Disponible"
          id="disponible"
          {...register("disponible")}
        />

        {(error || errorAutores) && <Alert variant="danger">{error || errorAutores}</Alert>}
        <Button type="submit" variant="dark" disabled={isSubmitting || loading || !!errorAutores}>
          Agregar libro
        </Button>
      </Form>
    </Container>
  );
}

export default LibroNuevo;
