var express = require('express');
var router = express.Router();
const Sequelize = require("sequelize");
const Subscription = require("../models").subscription;

messages = []

/* GET messages listing. */
router.get('/', async function(req, res, next) {
  res.send({messages})
  //res.send('respond with a resource');
});

module.exports = router;
