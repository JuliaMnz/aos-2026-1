const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Experiencia', {
    empresa: { type: DataTypes.STRING, allowNull: false },
    cargo: { type: DataTypes.STRING, allowNull: false },
    periodo: { type: DataTypes.STRING },
    descricao: { type: DataTypes.TEXT },
    // A chave estrangeira userId será criada pelo relacionamento no index.js
  });
};