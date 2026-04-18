import models from '../models/index.js';

const listarTarefas = async () => {
    return await models.Tarefa.findAll();
};

const buscarTarefaPorId = async (id) => {
    return await models.Tarefa.findByPk(id);
};

const criarTarefa = async (tarefaData) => {
    return await models.Tarefa.create(tarefaData);
};

const atualizarTarefa = async (id, data) => {
    const tarefa = await models.Tarefa.findByPk(id);
    if (tarefa) {
        return await tarefa.update(data);
    }
    return null;
};

const deletarTarefa = async (id) => {
    const linhasAfetadas = await models.Tarefa.destroy({
        where: { id: Number(id) }
    });
    return linhasAfetadas > 0;
};

export default {
    listarTarefas,
    buscarTarefaPorId,
    criarTarefa,
    atualizarTarefa,
    deletarTarefa
};