import argon2 from "argon2";
import { generateAccessToken, generateRefreshToken } from "../services/authService.js";

class SessionController {
  // Lógica do POST (Login)
  async store(req, res) {
    const { login, password } = req.body;
    const { models } = req.context;

    const user = await models.User.findByLogin(login);

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas (Usuário não encontrado)." });
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Credenciais inválidas (Senha incorreta)." });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user, req.context.models);

    return res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      accessToken,
      refreshToken,
    });
  }

  // Lógica do GET (Perfil)
  async show(req, res) {
    if (!req.context.me) {
      return res.status(401).json({ error: "Nenhuma sessão ativa encontrada." });
    }
    
    const user = await req.context.models.User.findByPk(req.context.me.id);
    return res.send(user);
  }
}

export default new SessionController();