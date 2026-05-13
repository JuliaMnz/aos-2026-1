import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const generateAccessToken = (user) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET não configurada no arquivo .env");
  }

  return jwt.sign(
    { id: user.id, username: user.username },
    secret,
    { expiresIn: '15m' }
  );
};

export const generateRefreshToken = async (user, models) => {
  if (!models || !models.RefreshToken) {
    throw new Error("Objeto models ou RefreshToken não foi fornecido ao serviço.");
  }

  const token = crypto.randomBytes(40).toString('hex');
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // Expira em 7 dias

  await models.RefreshToken.create({
    token,
    expiresAt,
    userId: user.id,
  });

  return token;
};