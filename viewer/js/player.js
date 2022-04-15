var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var etag = getUrlVars()["v"];
var gameID = getUrlVars()["id"];
var url = "https://www.youtube.com/embed/" + etag + "?enablejsapi=1";
document.getElementById("video").setAttribute("src", url);

var vidPlayer;
function onYouTubeIframeAPIReady() {
  vidPlayer = new YT.Player('video');
}

fetch('../../node-server/games/index.json', {method: 'GET'})
  .then(function(response) {
    return response.json();
  }).then(function(games) {
    var game = games[gameID];
    for (var key in game['videos']) {
      if (key === etag) {
        setPageTitle(game['videos'][key]);
      } else {
        setThumbnails(game['videos'][key], key, gameID)
      }
    }
  })
  .catch(function(err) {
	catchNodeError(err);
  });

var offsets = [];

fetch('../../node-server/pitches/index.json', {method: 'GET'})
  .then(function(response) {
    return response.json();
  })
  .then(function(pitches) {
    // Fetches the pertinent pitches
    offsets = pitches[gameID]['videos'][etag]['offsets'];
  })
  .catch(function(err) {
    catchNodeError(err);
  });

var currentPitch = 1;
function changePitch(path) {
  lastPitch = currentPitch;
  if (path === 'next') {
    currentPitch++;
  } else if (path === 'prev') {
    if (currentPitch > 1) {
      currentPitch--;
    }
  } else if (path === 'pitch') {
    currentPitch = document.getElementById("pitch-number").value;
  }
  if (currentPitch-1 in offsets) {
    vidPlayer.seekTo(offsets[currentPitch-1], true);
    document.getElementById("pitch-number").value = currentPitch;
  } else {
    alert('Sorry, that pitch does not exist!');
    currentPitch = lastPitch;
    document.getElementById("pitch-number").value = lastPitch;
  }
}
