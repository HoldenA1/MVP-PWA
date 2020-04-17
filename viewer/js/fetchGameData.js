var gameID = getUrlVars()["id"];

fetch('/node-server/games', {method: 'GET'})
  .then(function(response) {
    return response.json();
  }).then(function(games) {
    var game = games[gameID];
    setPageTitle(game['name']);
    // Returns a different gui if no videos were found
    if (Object.keys(game['videos']).length === 0) {
      var error = document.createElement("h2");
      error.innerHTML = "Sorry, there don't appear to be any videos for this game."
      document.querySelector('.thumbnails').appendChild(error);
    } else {
      for (var key in game['videos']) {
        // Creates thumbnails
        setThumbnails(game['videos'][key], key, gameID)
      }
    }
  })
  .catch(function(err) {
    catchNodeError();
  });
