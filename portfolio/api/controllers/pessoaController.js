const { Pessoa, Projeto } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const pessoa = await Pessoa.create(req.body);
      return res.status(201).json(pessoa);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async list(req, res) {
    // Inclui os projetos da pessoa na listagem (exigência de relacionamento)
    const pessoas = await Pessoa.findAll({ include: 'projetos' });
    return res.json(pessoas);
  },

  async update(req, res) {
    const { id } = req.params;
    await Pessoa.update(req.body, { where: { id } });
    return res.json({ message: "Atualizado com sucesso" });
  },

  async delete(req, res) {
    const { id } = req.params;
    await Pessoa.destroy({ where: { id } });
    return res.json({ message: "Removido com sucesso" });
  }
};