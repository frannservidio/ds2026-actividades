import { Router } from "express";
import * as autoresController from "../controllers/autores.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { validate, validateParams } from "../middlewares/validate.middleware.js";
import { autorCreateSchema, autorUpdateSchema } from "../validations/autor.validation.js";
import { idParamSchema } from "../validations/libro.validation.js";

const router = Router();

router.get("/", autoresController.listar);
router.get("/:id", validateParams(idParamSchema), autoresController.obtener);
router.post("/", authenticate, authorize("ADMIN"), validate(autorCreateSchema), autoresController.crear);
router.put("/:id", authenticate, authorize("ADMIN"), validateParams(idParamSchema), validate(autorUpdateSchema), autoresController.actualizar);
router.delete("/:id", authenticate, authorize("ADMIN"), validateParams(idParamSchema), autoresController.eliminar);

export default router;
