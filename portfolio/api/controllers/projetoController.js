const { Projeto } = require('../models');

module.exports = {
  async create(req, res) {
    const projeto = await Projeto.create(req.body);
    return res.status(201).json(projeto);
  },
  async list(req, res) {
    const projetos = await Projeto.findAll();
    return res.json(projetos);
  }
};