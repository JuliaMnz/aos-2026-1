const { Sequelize } = require('sequelize');

// Só carrega o dotenv se não estiver na Vercel
if (!process.env.VERCEL) {
    require('dotenv').config();
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    // ESTA LINHA É A CHAVE: Força a Vercel a usar o pacote 'pg' instalado
    dialectModule: require('pg'), 
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
});

module.exports = sequelize;