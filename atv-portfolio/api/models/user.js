const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('User', {
    nome: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true },
    sobre: { type: DataTypes.TEXT },
    telefone: { type: DataTypes.STRING }
  });
};