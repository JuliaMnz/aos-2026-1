import { Router } from "express";
import { tarefaController } from "../controllers/index.js"; 

const router = Router();

router.post("/", tarefaController.create);
router.get("/", tarefaController.getAll);
router.get("/:objectId", tarefaController.getById);
router.put("/:objectId", tarefaController.update);
router.delete("/:objectId", tarefaController.remove);

export default router;