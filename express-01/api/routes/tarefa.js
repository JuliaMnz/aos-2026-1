import { Router } from "express";
import { tarefaController } from "../controllers/index.js"; 
import { isAuthenticated } from "../middlewares/auth.js"; 

const router = Router();

router.post("/", isAuthenticated, tarefaController.create);
router.get("/", isAuthenticated, tarefaController.getAll);
router.get("/:objectId", isAuthenticated, tarefaController.getById);
router.put("/:objectId", isAuthenticated, tarefaController.update);
router.delete("/:objectId", isAuthenticated, tarefaController.remove);

export default router;