import "dotenv/config";
import cors from "cors";
import express from "express";
import models, { sequelize } from "./api/models"; 
import routes from "./api/routes";

const app = express();

// Configurações de Middleware
app.set("trust proxy", true);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  try {
    // Tenta buscar o usuário, mas se não achar (banco vazio), não crasha o site
    const me = await models.User.findOne({
      where: { username: "rwieruch" },
    });
    req.context = { models, me };
  } catch (error) {
    // Se der erro de conexão ou tabela inexistente, o servidor continua vivo
    req.context = { models, me: null };
  }
  next();
});

// Log de requisições no terminal
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Montagem das Rotas
app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);

// Rota inicial de teste
app.get("/", (req, res) => {
  res.send(
    "Servidor rodando com sucesso!\n" + (process.env.MESSAGE || "")
  );
});

const port = process.env.PORT ?? 3000;

// Sincronização com o Banco de Dados (PostgreSQL no NeonDB)
const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === 'true';

// Esta função cria os dados iniciais se o banco for resetado
const createInitialData = async () => {
  const user1 = await models.User.create({
    username: 'rwieruch',
  });

  await models.Message.create({
    text: 'Publicou um projeto no NeonDB!',
    userId: user1.id,
  });
};

// Sincroniza o banco e DEPOIS sobe o servidor
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    console.log("--> Populando banco de dados inicial...");
    await createInitialData();
  }

  // Na Vercel, o app.listen não é obrigatório, mas ajuda no log local
  if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => console.log('Servidor rodando na porta 3000!'));
  }
}).catch(err => {
  console.error('Erro ao sincronizar com o Neon:', err);
});

export default app;