var express = require('express');
var router = express.Router();
var fbLogin = require('../lib/api/fbAppLogin');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ok', function(req, res) {
	res.send('asjkldf');
})

router.use('/facebook', fbLogin);

module.exports = router;
