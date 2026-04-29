const express = require('express');
const cors = require('cors');
const { sequelize } = require('./api/models');
const routes = require('./api/routes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de Currículos está online!');
});

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ status: "API Online", message: "Acesse /api/pessoas para ver os dados" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});