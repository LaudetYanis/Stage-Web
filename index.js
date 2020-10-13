

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

let domain = "http://www.example.com/"

app.get('/sitemap.xml', async function(req, res, next){
  let xml_content = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <url>',
    '    <loc>' + domain + '</loc>',
    '    <lastmod>2020-10-13</lastmod>',
    '  </url>',
    '</urlset>'
  ]
  res.set('Content-Type', 'text/xml')
  res.send(xml_content.join('\n'))
})



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