var express = require('express');
var router = express.Router();
var request = require('request');
var OAuth2 = require('oauth').OAuth2;
var util = require('util');
var fb = require('../../config/config.js');
console.log(fb);
var oauth2 = new OAuth2(fb.id,
                        fb.secret,
                       "", "https://www.facebook.com/dialog/oauth",
                   "https://graph.facebook.com/oauth/access_token",
                   null);

router.get('/auth',function (req, res) {
	console.log("Auth")
    var redirect_uri = "https://bea771f9.ngrok.io/facebook/done";
    // For eg. "http://localhost:3000/facebook/callback"
    var params = {'redirect_uri': redirect_uri, 'scope':'user_about_me,publish_actions,user_actions.music,email,user_friends,read_custom_friendlists,user_likes'};
    res.redirect(oauth2.getAuthorizeUrl(params));
});


router.post('/',function (req, res) {
  console.log("post Auth");
    var redirect_uri = "https://bea771f9.ngrok.io/facebook/done";
    // For eg. "http://localhost:3000/facebook/callback"
    var params = {'redirect_uri': redirect_uri, 'scope':'user_about_me,publish_actions,user_actions.music,email,user_friends,read_custom_friendlists,user_likes'};
    //res.send('done');
    res.redirect(oauth2.getAuthorizeUrl(params));
    //res.send(oauth2.getAuthorizeUrl(params));
});

router.get('/done', function(req, res) {
	 if (req.error_reason) {
	  res.send(req.error_reason);
	 }
	 if (req.query.code) {
    console.log(req)
	  var loginCode = req.query.code;
	  var redirect_uri = "https://bea771f9.ngrok.io/facebook/done"; // Path_To_Be_Redirected_to_After_Verification
	 // For eg. "/facebook/callback"
	  oauth2.getOAuthAccessToken(loginCode, { 
	  	grant_type: 'authorization_code', 
	 	redirect_uri: redirect_uri
	  }, function(err, accessToken, refreshToken, params){
	    if (err) {
	      console.error(err);
	      res.send(err);
	    }
	    //var access_token = accessToken;
	    req.session = {}
      console.log(params)
	    req.session.access_token = params.access_token;
	    req.session.expires = params.expires;
   
      //res.send('done');
  	 console.log('_____________________________');
     console.log(req.session.access_token);
      res.redirect('/facebook/get_fb_profile?token=' + req.session.access_token);

	    }
	  );
 	}
});

router.get('/get_fb_profile', function(req, res) {
  //console.log(req.query.token)
  oauth2.get('https://graph.facebook.com/me', req.query.token, function(err, data ,response) {
  if (err) {
   console.error(err);
   res.send(err);
  }
  else {
   console.log(data);
   //res.send(JSON.stringify(data));
   var profile = JSON.parse(data);
   console.log('_____________________________');
   console.log(profile);
   //console.log(profile);
   var profile_img_url = "https://graph.facebook.com/"+profile.id+"/picture";
   //console.log(profile_img_url)
   var musics = "https://graph.facebook.com/"+profile.id+"/music";
   oauth2.get(musics, req.query.token, function(err, data ,response) {
    if(err) {
      console.log(err);
      res.send(err);
    }
    else {
      console.log(req.query.token)
      console.log("++++++++++++++++++++++++++++++")
      console.log(JSON.stringify(data));
    }
   })
   console.log(util.inspect(musics, {showHidden: false, depth: null}))
   //res.send(musics)
  }
 });
});



// Fetching friends list
router.post('/', function(req, res) {
  /*
  oauth2.get('https://graph.facebook.com/me/friendlists', req.params.token, function(err, data ,response) {
    if (err) {
     console.error(err);
     res.send(err);
    }
    else {
    	res.send(JSON.stringify(res));
    }
  });
  */
  //console.log(req);
  console.log(req.body.request_ids);
});

module.exports = router;