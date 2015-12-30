var express = require('express');
var bodyParser = require('body-parser');
var constants = require('./constants.js');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));
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
  console.log('Key %s', constants.keys.mailchimp);
});
