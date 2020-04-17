fetch('/node-server/games', {method: 'GET'})
  .then(function(response) {
    return response.json();
  })
  .then(function(games) {
    setPageTitle("Games List");
    for (var key in games) {
      var brk = document.createElement("hr");
      var link = document.createElement("a");
      link.innerHTML = games[key]['name'];
      url = "game/?id=" + key;
      link.setAttribute("href", url)
      document.getElementById("games").appendChild(link);
      document.getElementById("games").appendChild(brk);
    }
  })
  .catch(function(err) {
    catchNodeError();
  });
