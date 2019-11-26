const router = require('express').Router();
const {Point} = require('../db');

router.get('/:id', async (req, res, next) => {
  try {
    const tourPoints =  await Point.findAll({
      where: {
        tourId: req.params.id
      }
    })
    if (tourPoints) {
      // let orderedPoints = []
      // res.status(200).send(tourPoints)
      let orderedPoints = orderTourPoints(tourPoints,req.params.id)
      res.status(200).send(orderedPoints)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error) 
  }
})



const orderTourPoints = (pointsData, tourId) => {
  const orderedPoints = pointsData.sort((a, b) => a.stepNum - b.stepNum)
                                .map(point => [Number(point.x), Number(point.y), Number(point.z)])
  return orderedPoints
}


module.exports = router