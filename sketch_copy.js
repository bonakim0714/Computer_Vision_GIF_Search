let video;
let yolo;
let status;
let objects = [];
//let _classNames = new Array;
var apikey = 'dc6zaTOxFJmzC';
var query = '';



function setup() {
  var cnv = createCanvas(640, 480);
  var x = (windowWidth - 640) /2;
  var y = (windowHeight - 480) /2;
  cnv.position(x,y+170);
  video = createCapture(VIDEO);

  // Create a YOLO method
  yolo = ml5.YOLO(video, startDetecting);

  // Hide the original video
  video.hide();
  status = select('#status');
}


function draw() {
  image(video, 0, 0, 640, 480);
  /*for (let i = 0; i < objects.length; i++) {
    noStroke();
    fill(0, 255, 0);
    text(objects[i].className, objects[i].x*width, objects[i].y*height - 5);
    noFill();
    strokeWeight(4);
    stroke(0,255, 0);
    rect(objects[i].x*width, objects[i].y*height, objects[i].w*width, objects[i].h*height);
  }*/

  storeClassName();

}

function storeClassName() {
  var classNames = new Array;
  for (let i = 0; i < objects.length; i++) {
    noStroke();
    fill(0, 255, 0);
    text(objects[i].className, objects[i].x*width, objects[i].y*height - 5);
    noFill();
    strokeWeight(4);
    stroke(0,255, 0);
    rect(objects[i].x*width, objects[i].y*height, objects[i].w*width, objects[i].h*height);
    classNames.push(objects[i].className);

    var firstClassName = '';
    firstClassName = classNames[0];
    console.log (firstClassName);
    return firstClassName;
  }

}

function startDetecting() {
  status.html('MODEL LOADED!');
  detect();
}

function detect() {
  storeClassName();
  yolo.detect(function(err, results){
    objects = results;
    detect();
  });


$(document).ready(function() {

  function encodeQueryData(data)
  {
     var ret = [];
     for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
     return ret.join("&");
  }

  function httpGetAsync(theUrl, callback)
  {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
              callback(xmlHttp.responseText);
      }
      xmlHttp.open("GET", theUrl, true); // true for asynchronous
      xmlHttp.send(null);
  }


  function getGif(query) {
    console.log(query);
    query = query.replace(' ', '+');
    var params = { 'api_key': apikey, 'q': query};
    params = encodeQueryData(params);

    // api from https://github.com/Giphy/GiphyAPI#search-endpoint

    httpGetAsync('http://api.giphy.com/v1/gifs/search?' + params, function(data) {
      var gifs = JSON.parse(data);


        var firstgif = gifs.data[0].images.fixed_width.url;
        var secondgif = gifs.data[1].images.fixed_width.url;
        var thirdgif = gifs.data[2].images.fixed_width.url;
        var fourthgif = gifs.data[3].images.fixed_width.url;
        var fifthgif = gifs.data[4].images.fixed_width.url;


      $("#image0").html("<img src='" + firstgif + "'>");
      $("#image1").html("<img src='" + secondgif + "'>");
      $("#image2").html("<img src='" + thirdgif + "'>");
      $("#image3").html("<img src='" + fourthgif + "'>");
      $("#image4").html("<img src='" + fifthgif + "'>");
      console.log(gifs.data);
    });
  }

  $("#submitButton").on("click", function() {
  //  var query = $("#inputQuery").val();

    var query = storeClassName();
    getGif(query);
  });

  //$("inputquery" ).replaceWith( $( "classNames" ) );
})

}
