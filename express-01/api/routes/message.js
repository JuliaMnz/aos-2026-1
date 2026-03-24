import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

const router = Router();

//GET /messages - Listar todas as mensagens
router.get("/", async (req, res) => {
  const messages = await req.context.models.Message.findAll();
  return res.send(messages);
});

//GET /:messageId -
router.get("/:messageId", async (req, res) => {
  const message = await req.context.models.Message.findByPk(
    req.params.messageId,
  );
  return res.send(message);
});

//POST /messages - Criar mensagem
router.post("/", async (req, res) => {
  const message = await req.context.models.Message.create({
    text: req.body.text,
    userId: req.context.me.id,
  });

  return res.send(message);
});

//PUT /messages - Atualizar mensagem
router.put('/:messageId', async (req, res) => {
  const message = await req.context.models.Message.findByPk(req.params.messageId);
  if (message) {
    await message.update({ text: req.body.text });
  }
  return res.send(message);
});

//DELETE /messages - Deletar mensagem

router.delete("/:messageId", async (req, res) => {
  const result = await req.context.models.Message.destroy({
    where: { id: req.params.messageId },
  });

  return res.send(true);
});

export default router;