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

router.post('/', async (req, res, next) => {
  try {
    const tourPoints = await Point.create({
      stepNum: req.body.stepNum,
      x: req.body.points[0],
      y: req.body.points[1],
      z: req.body.points[2],
      tourId: req.body.tourId
    })
    res.status(201).send(tourPoints)
  } catch (error) {
    next(error)
  }
})


module.exports = router