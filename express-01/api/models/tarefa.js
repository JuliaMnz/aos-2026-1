const getTarefaModel = (sequelize, { DataTypes }) => {
  const Tarefa = sequelize.define("tarefa", {
    objectId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      field: 'objectid', // Força o mapeamento para o nome exato no banco
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'descricao',
    },
    concluida: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'concluida',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at', // Mapeia o createdAt do Sequelize para o created_at do SQL
    }
  }, {
    tableName: 'tarefas', 
    timestamps: true,     
    updatedAt: false,     
  });

  return Tarefa;
};

export default getTarefaModel;