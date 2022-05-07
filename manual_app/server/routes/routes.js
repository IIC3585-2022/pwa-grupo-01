var express = require('express');
var router = express.Router();

var indexRouter = require('./index');
var messagesRouter = require('./messages');
var subscriptionsRouter = require('./subscriptions');

router.use('/', indexRouter);
router.use('/messages', messagesRouter);
router.use('/subscriptions', subscriptionsRouter);
    
    
module.exports = router;
