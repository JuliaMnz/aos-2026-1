const express = require('express');
const router = express.Router();
const pessoaController = require('../controllers/pessoaController');

router.post('/', pessoaController.create);
router.get('/', pessoaController.list);
router.put('/:id', pessoaController.update);
router.delete('/:id', pessoaController.delete);

module.exports = router;