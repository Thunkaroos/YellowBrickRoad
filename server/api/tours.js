const router = require('express').Router();
const Tour = require('../db');

router.get('/', (req,res,next) => {
  try {
    const Tour = Tour.findAll()
  } catch (error) {
    console.log(error)
  }
} )