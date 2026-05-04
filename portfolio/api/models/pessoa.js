const { DataTypes } = require('sequelize');
const sequelize = require('../services/database');

const Pessoa = sequelize.define('Pessoa', {
  nome: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  cargo: { 
    type: DataTypes.STRING 
  },
  biografia: { 
    type: DataTypes.TEXT 
  }
  // Se você tiver outros campos (como idade, email), pode adicionar aqui!
});

module.exports = Pessoa;