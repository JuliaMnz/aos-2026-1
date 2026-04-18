import Sequelize from "sequelize";
import pg from 'pg'; 
import getUserModel from "./user.js";
import getMessageModel from "./message.js";
import Tarefa from "./tarefa.js"; 

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectModule: pg, 
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

Tarefa.init({
  descricao: { type: Sequelize.DataTypes.STRING, allowNull: false },
  concluida: { type: Sequelize.DataTypes.BOOLEAN, defaultValue: false }
}, {
  sequelize,
  modelName: 'Tarefa',
  tableName: 'tarefas'
});

const models = {
  User: getUserModel(sequelize, Sequelize),
  Message: getMessageModel(sequelize, Sequelize),
  Tarefa: Tarefa, 
};

Object.keys(models).forEach((key) => {
  if (models[key].associate) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;