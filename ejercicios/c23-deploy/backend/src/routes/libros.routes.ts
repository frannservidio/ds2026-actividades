import { Router } from "express";
import * as librosController from "../controllers/libros.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { validate, validateParams } from "../middlewares/validate.middleware.js";
import { idParamSchema, libroCreateSchema, libroUpdateSchema } from "../validations/libro.validation.js";

const router = Router();

router.get("/", librosController.listar);
router.get("/:id", validateParams(idParamSchema), librosController.obtener);
router.post("/", authenticate, authorize("ADMIN"), validate(libroCreateSchema), librosController.crear);
router.put("/:id", authenticate, authorize("ADMIN"), validateParams(idParamSchema), validate(libroUpdateSchema), librosController.actualizar);
router.delete("/:id", authenticate, authorize("ADMIN"), validateParams(idParamSchema), librosController.eliminar);

export default router;
