var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();


var decodeBase64Image = function(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
	extended: true,
	limit: '50mb'
}));

app.get('/', function(req, res){
    console.log('GET /')
    var html = fs.readFileSync('getusermedia.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
});


app.post('/capture', function(req, res){
    var imageBuffer = decodeBase64Image(req.body.data);
    
    fs.writeFile("images/out" + Date.now() + ".png", imageBuffer.data, function(err) {
	  console.log(err);
	});
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('thanks');
});

port = 3000;
app.listen(port);
console.log('Listening at http://localhost:' + port)
