

const path = require("path");
const express = require('express');
var app = express();
const auth = require('http-auth');

app.get('/', function(req, res) {
		res.sendFile( __dirname + "/src/index.html")
});

app.get('/sopymep*', function(req, res) {
		res.sendFile( __dirname + "/src/index.html")
});

app.get('/robots.txt', function(req, res) {
		res.set ('Content-Type', 'text/plain')
		res.sendFile( __dirname + "/src/robot.txt")
});

app.get('/favicon.ico', function(req, res) {
		res.sendFile( __dirname + "/src/favicon.ico")
});

console.log( auth )
const basic = auth.basic({
	realm: "Admin",
	file: __dirname + "/admin.htpasswd" // user:admin114, pass:zDvzxU0RNqSaugdxzxIi
});


app.get('/admin', basic.check((req, res) => {
		res.end(`Welcome to private area - ${req.user}!`);
}));

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