import { Router } from "express";
import argon2 from "argon2";
import { generateAccessToken, generateRefreshToken } from "../services/authService.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { login, password } = req.body;
    const { models } = req.context;

    // 400 Bad Request: Validação básica para não processar campos vazios
    if (!login || !password) {
      return res.status(400).json({ error: "Login e senha são obrigatórios." });
    }

    // Busca o usuário pelo username ou email
    const user = await models.User.findByLogin(login);

    // 404 Not Found: Recurso solicitado não foi encontrado
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // Verifica se a senha enviada corresponde ao hash no banco
    const isPasswordValid = await argon2.verify(user.password, password);

    // 401 Unauthorized: Credenciais inválidas (aqui a senha)
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    // Gera os tokens utilizando as funções do seu authService
    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user, models);

    // 200 OK: Sucesso total
    return res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("ERRO NO LOGIN:", error);
    // 500 Internal Server Error: Algo quebrou no código ou banco
    return res.status(500).json({ error: "Erro interno no servidor ao realizar login." });
  }
});

router.get("/", async (req, res) => {
  // 401 Unauthorized: Ninguém logado no contexto atual
  if (!req.context.me) {
    return res.status(401).json({ error: "Nenhuma sessão ativa encontrada (Token ausente ou inválido)." });
  }
  
  try {
    const user = await req.context.models.User.findByPk(req.context.me.id);
    
    // 404 Not Found: O ID do token não existe mais no banco
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado no banco de dados." });
    }

    // 200 OK: Retorna o usuário encontrado
    return res.status(200).send(user);
  } catch (error) {
    console.error("ERRO NO PERFIL:", error);
    return res.status(500).json({ error: "Erro ao buscar dados do perfil." });
  }
});

export default router;