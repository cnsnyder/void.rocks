import http = require('http');
export function listSubscribe(email: string, key: string, listId: string, callback: (response_data:any, headers:any, status:any) => void): void {
    var status: string;
    var headers: string;
    var response_data: string;
    var post_data = JSON.stringify({email_address:email,
                                    status:"pending"});
    console.log(post_data);
    var post_options = {
        host: 'us1.api.mailchimp.com',
        port: 80,
        path: '/3.0/lists/' + listId + '/members/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(post_data),
            'Authorization': 'apikey ' + key
        }
    };
    var req = http.request(post_options, function(res) {
      var statusCode: number = res.statusCode;
      var headers: string = JSON.stringify(res.headers)
      console.log('STATUS: ' + status);
      console.log('HEADERS: ' + headers);
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        response_data += chunk;
        console.log('BODY: ' + chunk);
      });
      res.on('end', function() {
        console.log('No more data in response.');
        callback(response_data, headers, status);
      });
    });
    req.on('error', function(e) {
      console.log('problem with request: ' + e);
    });
    req.write(post_data);
    req.end();
  };
