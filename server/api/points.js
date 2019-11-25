const router = require('express').Router();
const Points = require('../db');

router.get('/:id', (req, res, next) => {
  const tourPoints = Points.findById({
    where: {
      tourID: req.params.id
    }
  })
})