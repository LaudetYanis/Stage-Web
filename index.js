

const path = require("path");
const express = require('express');
var app = express();


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.sendFile( __dirname + "/src/index.html")
});

app.get('/robot.txt', function(req, res) {
  res.sendFile( __dirname + "/src/robot.txt")
});

app.get('/favicon.ico', function(req, res) {
  res.sendFile( __dirname + "/src/favicon.ico")
});



app.get('/css/:name', function (req, res, next) {
	var options = {
	    root: path.join(__dirname, 'src/css'),
	    dotfiles: 'deny',
	    headers: {
	    	'x-timestamp': Date.now(),
	    	'x-sent': true,
	    	'content-type': 'text/css'
	    }
	}

	var fileName = req.params.name
  	res.sendFile(fileName, options, function (err) {
    	if (err) {
      	next(err)
  		}
  	})
})

app.get('/js/:name', function (req, res, next) {
	var options = {
	    root: path.join(__dirname, 'src/js'),
	    dotfiles: 'deny',
	    headers: {
	    	'x-timestamp': Date.now(),
	    	'x-sent': true,
	    	'content-type': 'application/javascript'
	    }
	}

	var fileName = req.params.name
  	res.sendFile(fileName, options, function (err) {
    	if (err) {
      	next(err)
  		}
  	})
})

app.get('*', function(req, res) {
	res.redirect('/')
});

app.listen(80)