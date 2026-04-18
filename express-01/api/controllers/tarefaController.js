import tarefaService from '../services/tarefaService.js';
import Tarefa from '../models/tarefa.js';

const create = async (req, res) => {
    const validationError = Tarefa.validate(req.body);
    if (validationError) return res.status(400).json(validationError);
    try {
        const novaTarefa = await tarefaService.criarTarefa(req.body);
        res.status(201).json(novaTarefa);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar tarefa." });
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