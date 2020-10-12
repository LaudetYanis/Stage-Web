

const path = require("path");
const express = require('express');
var app = express();


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.sendFile( __dirname + "/src/index.html")
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
    } else {
      console.log('Sent:', fileName)
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
    } else {
      console.log('Sent:', fileName)
    }
  })
})

app.get('*', function(req, res) {
	res.redirect('/')
});

app.listen(80)