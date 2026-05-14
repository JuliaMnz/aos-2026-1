import "dotenv/config";
import cors from "cors";
import express from "express";
import argon2 from "argon2";
import models, { sequelize } from "./api/models/index.js";
import routes from "./api/routes/index.js";
import { isAuthenticated } from "./api/middlewares/auth.js"; 

const app = express();

// Configurações de Middleware
app.set("trust proxy", true);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


 // MIDDLEWARE DE CONTEXTO E AUTENTICAÇÃO (authMiddleware)
 // Extrai o token e preenche req.context.me se for válido.
 
app.use(async (req, res, next) => {
  req.context = { models, me: null };
  
  const authHeader = req.headers.authorization;
  if (authHeader) {
    try {
      // Usando o middleware existente para validar o token e preencher o 'me'
      await isAuthenticated(req, res, next);
      return; 
    } catch (e) {
      // Se o token for inválido, apenas segue (o próximo middleware decide se barra ou não)
    }
  }
  next();
});

 // PROTEÇÃO DE ROTAS (protectRoutes)
 // Bloqueia POST/PUT/DELETE se não estiver logado, exceto na Whitelist.
 
app.use((req, res, next) => {
  const publicRoutes = [
    { method: 'POST', path: '/session' },
    { method: 'POST', path: '/session/refresh' },
    { method: 'POST', path: '/users' }
  ];

  const isPublic = publicRoutes.some(route => 
    req.method === route.method && req.path.startsWith(route.path)
  );

  // GET liberado (exceto /session) e Whitelist liberada
  if ((req.method === 'GET' && req.path !== '/session') || isPublic) {
    return next();
  }

  // Se não houver um usuário no contexto, retorna erro 401
  if (!req.context.me) {
    return res.status(401).json({ error: "Acesso negado. Usuário não autenticado." });
  }

  next();
});

// Log de requisições
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Montagem das Rotas
app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);
app.use("/tarefas", routes.tarefa);

// Rota inicial
app.get("/", (req, res) => {
  res.send("Servidor rodando com sucesso!\n" + (process.env.MESSAGE || ""));
});

const port = process.env.PORT ?? 3000;
const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === 'true';

 // DADOS INICIAIS (createUsersWithMessages)
 // Atualizado para incluir hashes de senha.
 
const createInitialData = async () => {

  const user1 = await models.User.create({
    username: 'rwieruch',
    email: 'rwieruch@teste.com', 
    password: 'senha123'
  });

  await models.Message.create({
    text: 'Publicou um projeto no NeonDB!',
    userId: user1.id,
  });
};

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    console.log("--> Populando banco de dados inicial...");
    await createInitialData();
  }

  if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => console.log(`Servidor rodando na porta ${port}!`));
  }
}).catch(err => {
  console.error('Erro ao sincronizar com o Neon:', err);
});

export default app;