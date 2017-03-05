var express = require('express');
var router = express.Router();
var app = express();
var Model = require('../../../models');
var watson = require('watson-developer-cloud');

router.post('/increase', function(req, res) {
  var id = req.body.id;
  console.log(JSON.stringify(id));
  Model.PlayList.find({
          where: {
            Id: id
        }
        }).then(function(instance) {
          instance.increment('UpVote');
  });
  res.send();
});

router.post('/decrease', function(req, res) {
  var id = req.body.id;
  Model.PlayList.find({
          where: {
            Id: id
        }
        }).then(function(instance) {
          instance.decrement('DownVote');
  });
  res.send();
});

router.get('/', function(req, res) {
  Model.PlayList.findAll({ order: 'upVote - downVote DESC' }).then(function(data) {
    console.log(JSON.stringify(data));
    res.send(JSON.stringify(data));
  });
});


module.exports = router;
