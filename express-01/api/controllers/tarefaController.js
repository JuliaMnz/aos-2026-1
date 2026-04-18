import tarefaService from '../services/tarefaService.js';
import Tarefa from '../models/tarefa.js';

const create = async (req, res) => {
  try {
    const novaTarefa = await Tarefa.create(req.body);
    
    return res.status(201).json(novaTarefa);
  } catch (error) {
    // Se a validação do Sequelize falhar, ele cai aqui no catch
    return res.status(400).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
    const tarefas = await tarefaService.listarTarefas();
    res.json(tarefas);
};

const getById = async (req, res) => {
    const tarefa = await tarefaService.buscarTarefaPorId(req.params.objectId);
    if (!tarefa) return res.status(404).json({ error: "Tarefa não encontrada." });
    res.json(tarefa);
};

const update = async (req, res) => {
    const tarefa = await tarefaService.atualizarTarefa(req.params.objectId, req.body);
    if (!tarefa) return res.status(404).json({ error: "Tarefa não encontrada." });
    res.json(tarefa);
};

const remove = async (req, res) => {
    const tarefa = await tarefaService.deletarTarefa(req.params.objectId);
    if (!tarefa) return res.status(404).json({ error: "Tarefa não encontrada." });
    res.status(200).json({ message: "Tarefa removida com sucesso." });
};

export default {
    create,
    getAll,
    getById,
    update,
    remove
};