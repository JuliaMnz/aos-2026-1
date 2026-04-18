import { Model } from 'sequelize';

class Tarefa extends Model {
  // Se tiver associações, elas entram aqui:
  static associate(models) {
    // Ex: this.belongsTo(models.User);
  }
}

export default Tarefa;