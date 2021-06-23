// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();
var port = process.env.PORT;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (request, response) {
  response.json({greeting: 'hello API'});
});

app.get("/api/whoami", (request, response) => {
  // pull data from header
  var ipaddress = request.header("x-forwarded-for") || request.socket.remoteAddress; // get ip from header
  var language = request.header("accept-language");  // get language from header
  var software = request.header("user-agent").split(')')[0].split('(')[1]; // get software from header

  // response with json object
  response.send({
    software: software,
    language: language,
    ipaddress: ipaddress
  });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
