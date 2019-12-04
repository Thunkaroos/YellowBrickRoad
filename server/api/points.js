const router = require('express').Router();
const {Point} = require('../db');

router.get('/:id', async (req, res, next) => {
  try {
    const tourPoints = await Point.orderTourPoints(req.params.id)
    if (tourPoints) {
      res.status(200).send(tourPoints)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error) 
  }
})

router.post('/')


module.exports = router