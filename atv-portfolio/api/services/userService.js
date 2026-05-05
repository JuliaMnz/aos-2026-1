const { User, Experiencia } = require('../models');

module.exports = {
  async listAll() {
    return await User.findAll({ include: 'experiencias' });
  },
  async create(data) {
    return await User.create(data);
  },
  async update(id, data) {
    const user = await User.findByPk(id);
    if (user) return await user.update(data);
    return null;
  },
  async delete(id) {
    const user = await User.findByPk(id);
    if (user) return await user.destroy();
    return null;
  }
};