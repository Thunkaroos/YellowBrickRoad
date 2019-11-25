const router = require('express').Router();

router.get('/help', (req, res, next) => {
  res.send('Hello World!')
})

router.use('/users', require('./user')); // matches all requests to /api/users/
router.use('/tours', require('./tours'))
router.use('/points', require('./points'))

router.use((req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

module.exports = router;
