var express = require('express');
var router = express.Router();
var Model = require('../../../models');

router.get('/', function(req, res) {
  Model.ChatMessage.findAll().then(function(data) {
    res.send(JSON.stringify(data));
  });
});

module.exports = router;
