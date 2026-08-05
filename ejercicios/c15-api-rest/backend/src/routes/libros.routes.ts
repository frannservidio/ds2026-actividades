import { Router } from "express";
import * as librosController from "../controllers/libros.controller.js";

const router = Router();

router.get("/", librosController.listar);
router.get("/:id", librosController.obtener);
router.post("/", librosController.crear);
router.put("/:id", librosController.actualizar);
router.delete("/:id", librosController.eliminar);

export default router;
