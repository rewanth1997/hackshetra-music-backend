var express = require('express');
var router = express.Router();
var Model = require('../../../models');
var watson = require('watson-developer-cloud');

router.get('/', function(req, res) {

  var message = "";
  Model.ChatMessage.findAll().then(function(data) {

    data.forEach(function(element) {
      message += element.Message + " ";
    });

    var tone_analyzer = watson.tone_analyzer({
      username: '5dc0c62f-c19a-4cf4-aeb4-af5e1a26a068',
      password: '1GVAHMgUT50v',
      version: 'v3',
      version_date: '2016-05-19'
    });

    tone_analyzer.tone({ text: message },
      function(err, tone) {
        if (err)
          console.log(err);
        else {
          var tones = tone.document_tone.tone_categories[0].tones;
          var anger = tones[0];
          var disgust = tones[1];
          var joy = tones[3];
          var sadness = tones[4];
          var result = maximum(maximum(anger, disgust),maximum(joy, sadness));
          return res.send(result.tone_id);
        }
    });

  });

});

function maximum(input1, input2) {
  return input1.score >= input2.score ? input1 : input2;
}

module.exports = router;
