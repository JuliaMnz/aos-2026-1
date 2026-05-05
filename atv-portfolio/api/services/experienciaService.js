const { Experiencia } = require('../models');

module.exports = {
  async create(data) {
    return await Experiencia.create(data);
  },
  async update(id, data) {
    const exp = await Experiencia.findByPk(id);
    if (exp) return await exp.update(data);
    return null;
  },
  async delete(id) {
    const exp = await Experiencia.findByPk(id);
    if (exp) return await exp.destroy();
    return null;
  }
};