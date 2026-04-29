const express = require('express');
const router = express.Router();
const pessoaRoutes = require('./pessoa');
const projetoRoutes = require('./projeto');

router.use('/pessoas', pessoaRoutes);
router.use('/projetos', projetoRoutes);

module.exports = router;