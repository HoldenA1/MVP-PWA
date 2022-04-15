function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function setPageTitle(name) {
  document.querySelector("title").innerHTML = name;
  var head = document.querySelector(".header");
  var h1 = document.createElement("h1");
  var a = document.createElement("a");
  a.setAttribute("href", "/MVP-PWA/viewer");
  var img = document.createElement("img");
  img.setAttribute("src", "/MVP-PWA/viewer/images/icons/favicon-96x96.png");
  var title = document.createTextNode(name);
  a.appendChild(img);
  h1.appendChild(a);
  h1.appendChild(title);
  var hr = document.createElement("hr");
  head.appendChild(h1);
  head.appendChild(hr);
}

function setThumbnails(videoName, etag, gameID) {
  // Container for each vid/thumbnail object
  var container = document.createElement("div");
  container.setAttribute("class", "thumb")
  // Thumbnail picture of video
  var thumb = document.createElement("img");
  var pic = 'https://img.youtube.com/vi/' + etag + '/mqdefault.jpg';
  thumb.setAttribute("src", pic);
  thumb.setAttribute("style", "opacity: 0.3;");
  // Video titles
  var vidName = document.createElement("div");
  vidName.setAttribute("class", "thumb-text")
  vidName.innerHTML = videoName;
  // Link to player
  var link = document.createElement("a");
  var url = "../player/?id=" + gameID + "&v=" + etag;
  link.setAttribute("href", url);
  link.appendChild(thumb);
  link.appendChild(vidName);
  container.appendChild(link);
  document.querySelector('.thumbnails').appendChild(container);
}

function catchNodeError(err) {
  console.log(err);
  setPageTitle("Sorry, something wen't wrong.");
  var error = document.createElement("h2");
  error.innerHTML = "There was a problem connecting to the database. Plase try again later."
  error.setAttribute("style", "text-align: center;")
  document.querySelector('body').appendChild(error);
}
