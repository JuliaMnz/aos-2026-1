const { Sequelize } = require('sequelize');

// Só carrega o dotenv se não estiver na Vercel (onde as variáveis já existem)
if (!process.env.VERCEL) {
    require('dotenv').config();
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
});

module.exports = sequelize;