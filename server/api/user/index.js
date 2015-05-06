'use strict';

var express = require('express');
var controller = require('./user.controller.js');
var auth = require('../../auth/auth.service.js');

var router = express.Router();

router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id', auth.isAuthenticated(), controller.show);

module.exports = router;
