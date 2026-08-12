import { Router } from "express";
import * as autoresController from "../controllers/autores.controller.js";

const router = Router();

router.get("/", autoresController.listar);
router.get("/:id", autoresController.obtener);
router.post("/", autoresController.crear);
router.put("/:id", autoresController.actualizar);
router.delete("/:id", autoresController.eliminar);

export default router;
