var express = require('express');
var router = express.Router();

var indexRouter = require('./index');
var messagesRouter = require('./messages');

router.use('/', indexRouter);
router.use('/messages', messagesRouter);
    
    
module.exports = router;
