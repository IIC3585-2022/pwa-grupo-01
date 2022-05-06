var express = require('express');
var router = express.Router();

messages = []

/* GET messages listing. */
router.get('/', function(req, res, next) {
  res.send({messages})
  //res.send('respond with a resource');
});

module.exports = router;
