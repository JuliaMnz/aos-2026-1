import { Router } from "express";

const router = Router();

// GET /users- Listar todos
router.get("/", async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.send(users);
});

//GET /users/:userId - Buscar um específico
router.get("/:userId", async (req, res) => {
  const user = await req.context.models.User.findByPk(req.params.userId);
  return res.send(user);
});

//POST /users - Criar um novo usuário
router.post('/', async (rec, res) => {
    const user = await req.context.models.User.create({
        username: req.body.username,
    });
    return res.send(user);
});

//PUT /users/:userId - Atualizar um usuário
router.put('/:userId', async (rec, res) => {
    await req.context.models.User.update(
        { username: req.body.username },
        { where: { id: req.params.userId} }
    );
    const updatedUser = await
    req.context.models.User.findByPk(req.params.userId);
    return res.send(updatedUser);
});

router.post("/", (req, res) => {
  return res.send("POST HTTP method on user resource");
});

router.put("/:userId", (req, res) => {
  return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});

router.delete("/:userId", (req, res) => {
  return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

export default router;