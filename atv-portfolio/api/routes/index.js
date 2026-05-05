const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const experienciaRouter = require('./experienciaRouter');

router.use('/users', userRouter);
router.use('/experiencias', experienciaRouter);

module.exports = router;