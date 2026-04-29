const sequelize = require('../services/database'); // Importa a conexão
const Pessoa = require('./pessoa');
const Projeto = require('./projeto');

// Relacionamentos
Pessoa.hasMany(Projeto, { foreignKey: 'pessoaId', as: 'projetos' });
Projeto.belongsTo(Pessoa, { foreignKey: 'pessoaId', as: 'autor' });

module.exports = { 
  sequelize, 
  Pessoa, 
  Projeto 
};