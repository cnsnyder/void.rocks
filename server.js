var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");
const debug = process.env.MTAPP_DEBUG;

// Try to load the keys
var keys = undefined;
try {
  keys = JSON.parse(fs.readFileSync('keys.json', 'utf8'));
}
catch(err) {
  console.log(err);
}

if (keys === undefined && debug !=== undefined) {
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

app.get('/search', function (req, res) {
  for (param in req.query){
    console.log(req.query[param]);
  };
  res.json({result: req.query.q});
})

var server = app.listen(80, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
