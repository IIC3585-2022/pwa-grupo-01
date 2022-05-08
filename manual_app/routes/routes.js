var express = require('express');
var router = express.Router();

var indexRouter = require('./index');
var newsRouter = require('./news');
var subscriptionsRouter = require('./subscriptions');

router.use('/', indexRouter);
router.use('/news', newsRouter);
router.use('/subscriptions', subscriptionsRouter);
    
    
module.exports = router;
