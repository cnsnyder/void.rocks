var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");
var mailchimp = require("./mailchimp.js");
const debug = process.env.MTAPP_DEBUG;

// Try to load the keys
var keys = undefined;
try {
  keys = JSON.parse(fs.readFileSync('keys.json', 'utf8'));
}
catch(err) {
  console.log(err);
}
if (keys === undefined && debug !== undefined) {
  try {
    keys = JSON.parse(fs.readFileSync('.keys.json', 'utf8'))
  }
  catch(err) {
    console.log(err);
  }
}

// Set up express
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// Routes
app.use('/', express.static('public/index.html'))

// Forward the submission to mailchimp after adding our api key
app.post('/subscribe', function (req, res) {
  console.log("Processing request with body: %s", JSON.stringify(req.body));
  // send to mailchimp
  console.log(keys);
  mailchimp.listSubscribe(req.body.email_address, keys.mailchimp.key, keys.mailchimp.listId)
  res.json({email: req.body.email}); // send result
})

var server = app.listen(80, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
