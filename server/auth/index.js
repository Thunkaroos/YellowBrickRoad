const router = require('express').Router();
const localRouter = require('./local');
const googleRouter = require('./google');

router.use('/local', localRouter);

router.use('/google', googleRouter);

module.exports = router;
