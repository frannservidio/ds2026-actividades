import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

type LibroCardProps = {
  id: number;
  titulo: string;
  autor: string;
  precio: string;
  imagen: string;
};

function LibroCard({ id, titulo, autor, precio, imagen }: LibroCardProps) {
  const [liked, setLiked] = useState<boolean>(false);

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={imagen}
        alt={titulo}
        style={{ height: "280px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{titulo}</Card.Title>
        <Card.Text className="text-muted">{autor}</Card.Text>
        <Card.Text className="fw-bold fs-5 mt-auto">{precio}</Card.Text>
        <div className="d-flex gap-2">
          <Link
            to={`/libros/${id}`}
            className="btn btn-outline-dark flex-grow-1"
          >
            Ver mas
          </Link>
          <Button
            variant={liked ? "danger" : "outline-danger"}
            onClick={() => setLiked(!liked)}
          >
            <i className={liked ? "bi bi-heart-fill" : "bi bi-heart"}></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default LibroCard;
