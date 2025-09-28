// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Timestamp microservice API endpoint
app.get("/api/:date?", function (req, res) {
  let date;
  let dateParam = req.params.date;
  
  // If no date parameter provided, use current date
  if (!dateParam) {
    date = new Date();
  } else {
    // Check if the parameter is a number (unix timestamp)
    if (/^\d+$/.test(dateParam)) {
      // Convert to number and create date from unix timestamp
      date = new Date(parseInt(dateParam));
    } else {
      // Try to parse as date string
      date = new Date(dateParam);
    }
  }
  
  // Check if the date is valid
  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    // Return both unix timestamp and UTC string
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// Listen on port 5000 and bind to 0.0.0.0 for Replit environment
var listener = app.listen(process.env.PORT || 5000, '0.0.0.0', function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
