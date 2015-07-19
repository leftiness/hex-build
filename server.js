var express = require('express');
var app = express();
var options = {
	root: __dirname + '/dist/',
}

app.use('/assets', express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/dist'));

app.all('/*', function (req, res) {
	res.sendFile('index.html', options);
});

app.listen('5000');
console.log('All systems are go!');
