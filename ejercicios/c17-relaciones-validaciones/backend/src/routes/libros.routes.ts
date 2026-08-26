import { Router } from "express";
import * as librosController from "../controllers/libros.controller.js";
import { validate, validateParams } from "../middlewares/validate.middleware.js";
import { idParamSchema, libroCreateSchema, libroUpdateSchema } from "../validations/libro.validation.js";

const router = Router();

router.get("/", librosController.listar);
router.get("/:id", validateParams(idParamSchema), librosController.obtener);
router.post("/", validate(libroCreateSchema), librosController.crear);
router.put("/:id", validateParams(idParamSchema), validate(libroUpdateSchema), librosController.actualizar);
router.delete("/:id", validateParams(idParamSchema), librosController.eliminar);

export default router;
