var http = require('http');

exports.listSubscribe = function(email, key, listId, callback) {
  var response_data = "";
  var post_data = JSON.stringify({email_address:email,
                                  status:"pending"});
  console.log(post_data);
  var post_options = {
      host: 'us1.api.mailchimp.com',
      port: '80',
      path: '/3.0/lists/' + listId + '/members/',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(post_data),
          'Authorization': 'apikey ' + key
      }
  };
  var req = http.request(post_options, function(res) {

    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      response_data += chunk;
      console.log('BODY: ' + chunk);
    });
    res.on('end', function() {
      console.log('No more data in response.');
      callback(response_data);
    });
  });
  req.on('error', function(e) {
    console.log('problem with request: ' + e);
  });
  req.write(post_data);
  req.end();
};
