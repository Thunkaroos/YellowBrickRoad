const router = require('express').Router();
const {Tour} = require('../db');





router.get('/', async (req,res,next) => {
  try {
    const foundTours = await Tour.findAll()
    if (foundTours) {
      res.status(200).send(foundTours)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req,res,next) => {
  try {
    const tour = await Tour.findByPk(req.params.id)
    if (tour) {
      res.status(200).send(tour)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/user/:id', async (req,res,next) => {
  try {
    const tour = await Tour.findAll({
      where: {
        userId: req.params.id
      }
    })
    if (tour) {
      res.status(200).send(tour)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newTour = await Tour.create({
      name: req.body.name,
      description: req.body.description,
      startImg: req.body.startImg,  
      userId: 1
    })
    res.status(201).send(newTour)
  } catch (error) {
    next(error)
  }
})




module.exports = router