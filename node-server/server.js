var express = require('express');
var app = express();
var cors = require('cors');
var mongoose = require('mongoose');
var url = 'mongodb+srv://holden:123Mag!k@mvp-db-abxu4.mongodb.net/mvpData?retryWrites=true&w=majority/';
mongoose.connect(url, { useNewUrlParser: true });

app.use(cors());

var pitchSchema = mongoose.Schema({
  _id: String,
  id: String,
  game: {
    id: String,
    name: String,
  },
  VIDEO: Array,
});
var Pitch = mongoose.model("Pitch", pitchSchema, 'pitch');

function getEtagFromURL(url) {
  return url.split(".be/")[1].split("?t=")[0];
}

app.get('/node-server/games', function(req, res) {
  Pitch.find({ id: "1" }, function(err, response) {
    gameData = {};
    for (var i = 0; i < response.length; i++) {
      var game = response[i];
      var videos = {};
      for (var j = 0; j < game['VIDEO'].length; j++) {
        var video = game['VIDEO'][j];
        // In case there are no videos for this game
        if (video['name'] === "") break;
        var etag = getEtagFromURL(video['url']);
        videos[etag] = video['name'];
      }
      gameData[game['game']['id']] = { name: game['game']['name'], videos: videos };
    }
    res.send(gameData);
  });
});

app.get('/node-server/pitches', function(req, res) {
  Pitch.find({}, function(err, response) {
    var data = {};
    for (var i = 0; i < response.length; i++) {
      var game = response[i];
      if (game['id'] === '1') {
        var videos = {};
        for (var j = 0; j < game['VIDEO'].length; j++) {
          var video = game['VIDEO'][j];
          if (video['name'] === '') break;
          var etag = getEtagFromURL(video['url']);
          var offsets = [];
          for (var k = i; response[k]['game']['id'] === game['game']['id']; k++) {
            var pitch = response[k]['VIDEO'][j];
            var offset = pitch['baseOffset'] - pitch['correction'];
            offsets.push(offset);
          }
          videos[etag] = { name: video['name'], offsets: offsets };
        }
        data[game['game']['id']] = { name: game['game']['name'], videos: videos };
      }
    }
    res.send(data);
  });
});

app.listen(3000);
