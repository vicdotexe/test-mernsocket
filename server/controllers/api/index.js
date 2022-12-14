const express = require('express');
const router = express.Router();
const users = require('./users');

router.use('/users', users)
router.use('/chats', require('./Chats'))

module.exports = router;