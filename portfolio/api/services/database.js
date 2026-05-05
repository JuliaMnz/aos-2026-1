const { Sequelize } = require('sequelize');
const pg = require('pg'); // Importação explícita do driver

if (!process.env.VERCEL) {
    require('dotenv').config();
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectModule: pg, // Força o Sequelize a usar o pacote importado acima
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
});

module.exports = sequelize;