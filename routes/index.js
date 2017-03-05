var express = require('express');
var router = express.Router();
var path = require('path');

var toneAnalyzerRouter = require('../lib/api/Analyze/toneAnalyzer');
var playListRouter = require('../lib/api/PlayList/playList');
var chatMessageRouter = require('../lib/api/ChatMessage/chatMessage.js');
var downloadRouter = require('../lib/api/Download/download.js');

router.use('/analyze', toneAnalyzerRouter);
router.use('/playList', playListRouter);
router.use('/chatMessage', chatMessageRouter);
router.use('/download', downloadRouter);

router.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname + "/../public/index.html"));
});

module.exports = router;
