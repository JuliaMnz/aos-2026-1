import { Router } from "express";
import argon2 from "argon2";
import { generateAccessToken, generateRefreshToken } from "../services/authService.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = Router();

 // POST /session
 // Login: Gera novos tokens de acesso e refresh

router.post("/", async (req, res) => {
  try {
    const { login, password } = req.body;
    const { models } = req.context;

    if (!login || !password) {
      return res.status(400).json({ error: "Login e senha são obrigatórios." });
    }

    const user = await models.User.findByLogin(login);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user, models);

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
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
});

 // POST /session/refresh
 // Atualiza o Access Token usando um Refresh Token válido
 
router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const { models } = req.context;

    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token é obrigatório." });
    }

    // Busca o token no banco
    const savedToken = await models.RefreshToken.findOne({ 
      where: { token: refreshToken } 
    });

    // Verifica se existe e se não expirou
    if (!savedToken || new Date() > savedToken.expiresAt) {
      return res.status(401).json({ error: "Refresh token inválido ou expirado." });
    }

    const user = await models.User.findByPk(savedToken.userId);

    // Gera novos tokens (Mantendo a data de expiração original do Refresh Token)
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = await generateRefreshToken(user, models, savedToken.expiresAt);

    // Remove o token antigo para evitar reuso (Rotate)
    await savedToken.destroy();

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error("ERRO NO REFRESH:", error);
    return res.status(500).json({ error: "Erro ao atualizar sessão." });
  }
});

 // DELETE /session
 // Logout: Remove o refresh token do banco
 
router.delete("/", isAuthenticated, async (req, res) => {
  try {
    const { models } = req.context;
    
    await models.RefreshToken.destroy({
      where: { userId: req.context.me.id }
    });

    return res.status(204).send(); 
  } catch (error) {
    console.error("ERRO NO LOGOUT:", error);
    return res.status(500).json({ error: "Erro ao fazer logout." });
  }
});

 // GET /session
 // Perfil: Retorna dados do usuário logado
 
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const user = await req.context.models.User.findByPk(req.context.me.id);
    
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email
    });
  } catch (error) {
    console.error("ERRO NO PERFIL:", error);
    return res.status(500).json({ error: "Erro ao buscar dados do perfil." });
  }
});

export default router;