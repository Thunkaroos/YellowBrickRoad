const router = require('express').Router();
const {Tour} = require('../db');

router.get('/', (req,res,next) => {
  try {
    const foundTours = Tour.findAll()
    if (foundTours) {
      res.status(200).send(foundTours)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
} )

module.exports = router