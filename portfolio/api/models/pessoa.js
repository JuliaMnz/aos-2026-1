const { DataTypes } = require('sequelize');
const sequelize = require('../services/database'); 

const Pessoa = sequelize.define('Pessoa', {
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  bio: { type: DataTypes.TEXT },
  formacao: { type: DataTypes.STRING }
});

module.exports = Pessoa;