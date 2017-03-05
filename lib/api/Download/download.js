var express = require('express');
var router = express.Router();
var Model = require('../../../models');
var PythonShell = require('python-shell');

router.get('/', function(req, res) {

  var query = "blank space";
  var options = {
    scriptPath: 'scripts',
    args: [query]
  };

PythonShell.run('download.py', options, function (err, results) {
    if (err) throw err;
    console.log('Success');
  });
});

module.exports = router;
