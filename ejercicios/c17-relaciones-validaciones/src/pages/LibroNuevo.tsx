import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  libroSchema,
  type LibroFormValues,
  type LibroValidado,
} from "../schemas/libroSchema";
import type { Libro } from "../types/libro";

const IMG_PLACEHOLDER = "https://placehold.co/300x400?text=Libro";

type LibroNuevoProps = {
  onAgregar: (libro: Omit<Libro, "id">) => void;
};

function formatearPrecio(precio: number) {
  return `$${precio.toLocaleString("es-AR")}`;
}

function LibroNuevo({ onAgregar }: LibroNuevoProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LibroFormValues, unknown, LibroValidado>({
    resolver: zodResolver(libroSchema),
    defaultValues: {
      titulo: "",
      autor: "",
      precio: 0,
      descripcion: "",
      disponible: true,
    },
  });

  const onSubmit = (data: LibroValidado) => {
    onAgregar({
      titulo: data.titulo,
      autor: data.autor,
      precio: formatearPrecio(data.precio),
      imagen: IMG_PLACEHOLDER,
      descripcion: data.descripcion,
      destacado: false,
      disponible: data.disponible,
    });

    navigate("/catalogo");
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

        <Form.Group className="mb-3" controlId="autor">
          <Form.Label>Autor</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Julio Cortazar"
            isInvalid={!!errors.autor}
            {...register("autor")}
          />
          <Form.Control.Feedback type="invalid">
            {errors.autor?.message}
          </Form.Control.Feedback>
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

        <Button type="submit" variant="dark" disabled={isSubmitting}>
          Agregar libro
        </Button>
      </Form>
    </Container>
  );
}

export default LibroNuevo;
