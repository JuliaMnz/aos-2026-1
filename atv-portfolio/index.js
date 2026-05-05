const express = require('express');
const { sequelize } = require('./api/models');
const routes = require('./api/routes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 3000;

// Sincroniza o banco de dados e inicia o servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
});

module.exports = app;