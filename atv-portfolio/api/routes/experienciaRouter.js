const express = require('express');
const router = express.Router();
const experienciaController = require('../controllers/experienciaController');

router.post('/', experienciaController.create);
router.put('/:id', experienciaController.update);
router.delete('/:id', experienciaController.delete);

module.exports = router;