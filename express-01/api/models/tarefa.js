import { DataTypes, Model } from 'sequelize';
import sequelize from './index.js'; 

class Tarefa extends Model {}

Tarefa.init({
  descricao: { type: DataTypes.STRING, allowNull: false },
  concluida: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  sequelize,
  modelName: 'Tarefa',
  tableName: 'tarefas'
});

export default Tarefa; 