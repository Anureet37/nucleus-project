const express = require('express');
const Restaurant = require('../models/Restaurant');
const router = new express.Router();

router.get('/menu', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      name: req.body.name,
    });
    res.status(200).send(restaurant);
  } catch (e) {
    res.status(404).send();
  }
});

router.get('/vacancy', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      name: req.query.name,
    });
    res.status(200).send({
      vacancy: restaurant.vacancy
    });
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;