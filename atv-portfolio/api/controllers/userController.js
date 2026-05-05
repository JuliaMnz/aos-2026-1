const userService = require('../services/userService');

module.exports = {
  async getAll(req, res) {
    const users = await userService.listAll();
    res.json(users);
  },
  async create(req, res) {
    const user = await userService.create(req.body);
    res.status(201).json(user);
  },
  async update(req, res) {
    const user = await userService.update(req.params.id, req.body);
    user ? res.json(user) : res.status(404).send('Usuário não encontrado');
  },
  async delete(req, res) {
    await userService.delete(req.params.id);
    res.status(204).send();
  }
};