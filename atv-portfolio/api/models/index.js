const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
});

const User = require('./user')(sequelize);
const Experiencia = require('./experiencia')(sequelize);

// RELACIONAMENTO: Um usuário tem muitas experiências
User.hasMany(Experiencia, { as: 'experiencias', foreignKey: 'userId' });
Experiencia.belongsTo(User, { as: 'usuario', foreignKey: 'userId' });

module.exports = { sequelize, User, Experiencia };