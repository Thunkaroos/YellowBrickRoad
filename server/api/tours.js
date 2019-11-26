const router = require('express').Router();
const {Tour} = require('../db');

router.get('/', (req,res,next) => {
  try {
    const foundTour = Tour.findAll()
    if (foundTour) {
      res.status(200).send(foundTour)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
} )

module.exports = router