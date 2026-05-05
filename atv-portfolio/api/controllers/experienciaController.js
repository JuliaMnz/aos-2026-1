const experienciaService = require('../services/experienciaService');

module.exports = {
  async create(req, res) {
    try {
      const exp = await experienciaService.create(req.body);
      res.status(201).json(exp);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async update(req, res) {
    const exp = await experienciaService.update(req.params.id, req.body);
    exp ? res.json(exp) : res.status(404).send('Experiência não encontrada');
  },
  async delete(req, res) {
    await experienciaService.delete(req.params.id);
    res.status(204).send();
  }
};