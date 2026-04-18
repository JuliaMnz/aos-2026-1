import models from '../models/index.js';

const criarTarefa = async (tarefaData) => {
    return await models.Tarefa.create(tarefaData);
};

const listarTarefas = async () => {
    return await models.Tarefa.findAll();
};

const buscarTarefaPorId = async (id) => {
    return await models.Tarefa.findByPk(id);
};

const atualizarTarefa = async (id, data) => {
    const tarefa = await models.Tarefa.findByPk(id);
    if (tarefa) {
        return await tarefa.update(data);
    }
    return null;
};

const deletarTarefa = async (id) => {
    const tarefa = await models.Tarefa.findByPk(id);
    if (tarefa) {
        await tarefa.destroy();
        return true;
    }
    return null;
};

export default {
    criarTarefa,
    listarTarefas,
    buscarTarefaPorId,
    atualizarTarefa,
    deletarTarefa
};