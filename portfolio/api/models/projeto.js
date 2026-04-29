const { DataTypes } = require('sequelize');
const sequelize = require('../services/database');

const Projeto = sequelize.define('Projeto', {
  nome: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.TEXT },
  tecnologias: { type: DataTypes.STRING }
});

module.exports = Projeto;