// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var request = require('request')

var YAML = require('yamljs');
 
 
// Load yaml file using YAML.load 
var reps = YAML.load('legislators-current.yaml');
console.log(reps[0].name);

var i = 0; 
var listLength = reps.length;
var repsNames = [];

  while (i < listLength) {
    repsNames.push(reps[i]);
    i++;
  }

repsNames.sort(function(a, b) {
    var textA = a.name.last.toUpperCase();
    var textB = b.name.last.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
});

// console.log(repsNames)
console.log("Number of reps: " + repsNames.length)

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/house", function (req, res) {
  res.sendFile(__dirname + '/views/house.html');
});

app.get("/senate", function (req, res) {
  res.sendFile(__dirname + '/views/senate.html');
});

app.get("/api/bills", function (req, res) {
  
  var sunlightResponse = "";

    request("https://congress.api.sunlightfoundation.com/bills?congress=115&per_page=100", function (error, response, body){
      if (!error && response.statusCode == 200) {
          res.send(body);
      }
    }); 

});

app.get("/bills", function (req, res) {
  res.sendFile(__dirname + '/views/bills.html');
});

app.get("/dreams", function (req, res) {
  res.send(dreams);
});

app.get("/reps", function (req, res) {
  res.send(repsNames);
});


app.get("/zip", function (req, res) {
  
  var sunlightResponse = "";

    request("https://congress.api.sunlightfoundation.com/districts/locate?zip=" + req.query.zip, function (error, response, body){
      if (!error && response.statusCode == 200) {
          res.json(JSON.parse(body)._links.self);
      }
    }); 




});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT || 5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
