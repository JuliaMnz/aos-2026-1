import { Router } from "express";
import argon2 from "argon2";
import { generateAccessToken, generateRefreshToken } from "../services/authService.js";
import { isAuthenticated } from "../middlewares/auth.js"; // Importando o middleware

const router = Router();


 //POST /session
 //Rota de Login (Pública)

router.post("/", async (req, res) => {
  try {
    const { login, password } = req.body;
    const { models } = req.context;

    // 400 Bad Request: Validação de campos
    if (!login || !password) {
      return res.status(400).json({ error: "Login e senha são obrigatórios." });
    }

    const user = await models.User.findByLogin(login);

    // 404 Not Found: Usuário não existe
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    // 401 Unauthorized: Senha incorreta
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user, models);

    // 200 OK: Login realizado
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
    return res.status(500).json({ error: "Erro interno no servidor ao realizar login." });
  }
});

// DELETE /session
// Rota de Logout (Protegida) 

router.delete("/", isAuthenticated, async (req, res) => {
  try {
    const { models } = req.context;
    
    // Apaga os tokens de atualização do usuário para deslogar de verdade
    await models.RefreshToken.destroy({
      where: { userId: req.context.me.id }
    });

    return res.status(204).send(); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao fazer logout." });
  }
});

 // GET /session
 // Rota de Perfil (Protegida)

router.get("/", isAuthenticated, async (req, res) => {
  try {
    // Se chegou aqui, o isAuthenticated já validou o token e preencheu req.context.me
    const user = await req.context.models.User.findByPk(req.context.me.id);
    
    // 404 Not Found: O ID que estava no token não existe mais no banco
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado no banco de dados." });
    }

    // 200 OK: Retorna o usuário encontrado
    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email
    });
  } catch (error) {
    console.error("ERRO NO PERFIL:", error);
    // 500 Internal Server Error
    return res.status(500).json({ error: "Erro ao buscar dados do perfil." });
  }
});

export default router;