/// <reference path="./typings/main.d.ts" />
import express = require('express');
import bodyParser = require('body-parser');
import fs = require("fs");
import path = require('path');
// TODO: Convert to ts
import * as mailchimp from './mailchimp.ts';
import * as test from './test.ts';
import favicon = require('serve-favicon');
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

app.use(favicon(path.join(__dirname, 'public', 'assets', 'favicon.png')));
app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


// Routes
app.use('/', express.static('public/index.html'));
app.use('/privacy_policy', express.static('public/static/privacy_policy.html'));

// Forward the submission to mailchimp after adding our api key
app.post('/subscribe', function (req, res) {
  console.log("Processing request with body: %s", JSON.stringify(req.body));
  // send to mailchimp
  console.log(keys);
  mailchimp.listSubscribe(req.body.email_address,
                          keys.mailchimp.key,
                          keys.mailchimp.listId,
                          function (response_data, headers, status){
                            console.log('SERVER response_data: %s', response_data);
                            if (status == '200'){
                              res.json({success: true, displayMessage: "Check email to confirm."});
                            } else if (status == '400'){
                              res.json({"success": false, displayMessage: "This email is already subscribed."})
                            }
                          });
});
app.use(function(req, res, next) {
  res.status(404);
  if (req.accepts('html')) {
      res.render('404', {url: req.url });
  }
});

var server = app.listen(80, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
