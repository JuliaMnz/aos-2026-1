import "dotenv/config";
import cors from "cors";
import express from "express";
import models, { sequelize } from "./models"; 
import routes from "./routes";

const app = express();

// Configurações de Middleware
app.set("trust proxy", true);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de Contexto: Define quem é o usuário "logado" e passa os modelos
app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findOne({ where: { username: "rwieruch" } }),
  };
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
const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    await createInitialData();
  }

  app.listen(port, () =>
    console.log(`Aplicação ouvindo na porta ${port}!`)
  );
});

// Função para popular o banco caso esteja vazio (apenas para teste)
const createInitialData = async () => {
  await models.User.create(
    {
      username: "rwieruch",
      email: "rwieruch@email.com",
      messages: [
        { text: "Publicado o tutorial de React" },
      ],
    },
    { include: [models.Message] }
  );

  await models.User.create(
    {
      username: "ddavids",
      email: "ddavids@email.com",
      messages: [
        { text: "Feliz em lançar o projeto!" },
      ],
    },
    { include: [models.Message] }
  );
};

export default app;