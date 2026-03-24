import { Router } from "express";

const router = Router();

// GET /users - Listar todos
router.get("/", async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.send(users);
});

// GET /users/:userId - Buscar um específico
router.get("/:userId", async (req, res) => {
  const user = await req.context.models.User.findByPk(req.params.userId);
  return res.send(user);
});

// POST /users - Criar um novo usuário
router.post('/', async (req, res) => { 
  const user = await req.context.models.User.create({
    username: req.body.username,
  });
  return res.send(user);
});

// PUT /users/:userId - Atualizar um usuário
router.put('/:userId', async (req, res) => { 
  await req.context.models.User.update(
    { username: req.body.username },
    { where: { id: req.params.userId } }
  );
  const updatedUser = await req.context.models.User.findByPk(req.params.userId);
  return res.send(updatedUser);
});

// DELETE /users/:userId - Deletar usuário
router.delete('/:userId', async (req, res) => {
  await req.context.models.User.destroy({
    where: { id: req.params.userId },
  });
  return res.send(true);
});

export default router;