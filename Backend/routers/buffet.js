const express = require('express');
const Buffet = require('../models/Buffet');
const Restaurant = require('../models/Restaurant');
const router = new express.Router();

router.get('/buffet', async (req, res) => {
  try {
    var restaurant = await Restaurant.findOne({
      name: req.body.name
    });
    if (!restaurant) {
      throw new Error();
    }
    var id = restaurant._id;
    var buffet = await Buffet.findOne({
      restaurant_id: id
    });
    res.send(buffet);
  } catch (error) {
    res.send({
      error: "Cannot GET"
    });
  }
});

router.patch('/buffet', async (req, res) => {
  try {
    var user = await User.findOne({
      uid: req.uid
    });
    var restaurant = await Restaurant.findOne({
      name: req.body.name
    });
    if (!restaurant) {
      throw new Error();
    }
    var id = restaurant._id;
    var buffet = await Buffet.findOne({
      restaurant_id: id
    });
    //0 for 1st slot 1 for 2nd and 2 for 3rd --> slotTime
    var buffetType = buffet.slots[req.body.slotType].slot_details[req.body.slotTime];
    var x = req.body.number;
    var y = buffetType.totalPeople;
    if (Number(y) + Number(x) <= Number(buffetType.Limit)) {
      buffetType.bookedBy.append({
        userId: user._id,
        number: req.body.number
      });
      buffetType.totalPeople += Number(x);
      await buffet.save();
    } else {
      throw new Error('Slot Full');
    }
    res.send(buffet);
  } catch (e) {
    res.status(500).send({
      e
    });
  }
});


//Slot type
//Slot Time
router.patch('/buffet/reset', async (req, res) => {
  try {
    var buffets = Buffet.find({});
    buffets.foreach((buffet) => {
      var buffetType = buffet.slots[req.body.slotType].slot_details[req.body.slotTime];
      buffetType.totalPeople = 0;
      buffetType.bookedBy = [];
      await buffet.save();
    });
    res.status().send()
  } catch (e) {
    res.status(500).send();
  }
});


//User Id
//Buffet Id
//Slot Type
//Slot Time
router.patch('/buffet/cancel', async (req, res) => {
  try {
    var buffet = Buffet.findById({
      _id: req.body.bid
    });
    var buffetType = buffet.slots[req.body.slotType].slot_details[req.body.slotTime];
    var x = buffetType.totalPeople;
    var y = buffetType.bookedBy.findIndex((z) => {
      return z.user_id === req.body.uid;
    });
    var z = buffetType.bookedBy[y];
    x -= z.number;
    buffetType.totalPeople = x;
    await buffet.save();
    res.send(buffet);
  } catch (e) {
    res.status(500).send();
  }
});
module.exports = router;