import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { loginSchema, type LoginValues } from "../schemas/loginSchema";
import { apiFetch } from "../services/api";
import { guardarToken, borrarToken } from "../services/token";
type Sesion = { token: string; usuario: { id: number; email: string; nombre: string; rol: "ADMIN" | "CLIENTE" } };
export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });
  const onSubmit = async (datos: LoginValues) => {
    setError(null); setAviso(null);
    try {
      const sesion = await apiFetch<Sesion>("/auth/login", { method: "POST", body: JSON.stringify(datos) });
      guardarToken(sesion.token); navigate("/catalogo");
    } catch (err) { setError(err instanceof Error ? err.message : "No se pudo iniciar sesion"); }
  };
  return <Container className="py-5"><Form noValidate onSubmit={handleSubmit(onSubmit)} className="mx-auto" style={{ maxWidth: 560 }}>
    <h1>Iniciar sesion</h1>
    <Form.Group controlId="email" className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" autoComplete="username" {...register("email")} isInvalid={!!errors.email} /><Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback></Form.Group>
    <Form.Group controlId="password" className="mb-3"><Form.Label>Contrasena</Form.Label><Form.Control type="password" autoComplete="current-password" {...register("password")} isInvalid={!!errors.password} /><Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback></Form.Group>
    {error && <Alert variant="danger">{error}</Alert>}{aviso && <Alert variant="info">{aviso}</Alert>}
    <Button type="submit" variant="dark" disabled={isSubmitting}>Ingresar</Button>{" "}
    <Button type="button" variant="outline-dark" onClick={() => { borrarToken(); setError(null); setAviso("Sesion cerrada"); }}>Cerrar sesion</Button>
  </Form></Container>;
}
