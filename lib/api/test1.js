var express = require('express');
var router = express.Router();
var request = require('request');
var OAuth2 = require('oauth').OAuth2;
var util = require('util');
var fb = require('./test');

router.get('/', function(req, res) {
	fb.getFbData('EAAaU3qZAdD8QBAMlXQfSivu7CuSQJUWv1a9Tm0iuvLb9NZCZCptKZB5lGqBuxeAV0qeObzr3CQNmgSCpFRYkO8bjV15sOJtyUh2FurACZBZBNtdTsEEmdgu6gjvn1gsTvqLMSYrZCOro5OI6rNg1J1dZC4bnYY1CCIYZD', '/me/friends', function(data){
	    console.log(data);
	});
});

module.exports = router;