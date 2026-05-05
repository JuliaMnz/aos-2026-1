const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.listAll);        // Listar todos 
router.get('/:id', userController.getById);     // Buscar currículo completo
router.post('/', userController.create);        // Criar novo usuário
router.put('/:id', userController.update);      // Atualizar dados
router.delete('/:id', userController.delete);   // Deletar usuário

module.exports = router;