var express = require('express');
var router = express.Router();
const Sequelize = require("sequelize");
const Subscription = require("../models").subscription;

/* GET messages listing. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  const {endpoint, expirationTime, keys: {auth, p256dh}} = req.body;
  Subscription.create({
    endpoint,
    expirationTime,
    keys_auth: auth,
    keys_p256dh: p256dh
  });
  res.sendStatus(200)
  //res.send('respond with a resource');
});

module.exports = router;
