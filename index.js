

const path = require("path");
const express = require('express');
const app = express();
const auth = require('http-auth');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const sqlite = require('./aa-sqlite.js');

;(async()=>{
	
console.log( await sqlite.open('./sopymep.db') )


await sqlite.run( `DROP TABLE IF EXISTS Devis`)

await sqlite.run( `CREATE TABLE IF NOT EXISTS Devis (
	devis_id INTEGER PRIMARY KEY, 
	nom VARCHAR(64),
	email VARCHAR(320),
	tel VARCHAR(10),
	date DATETIME DEFAULT CURRENT_TIMESTAMP,
	pourle DATETIME,
	ip VARCHAR(15),
	message TEXT,
	files TEXT
)`)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(fileUpload({
   limits: {
	   fileSize: 20000000 //20mb
   },
   abortOnLimit: true,
   useTempFiles : true,
   tempFileDir : '/tmp/'
}));



// API 

app.post('/api/contact', function(req, res) {
	
	console.log( req.body )

	//console.log( req.files )


	let arr = []

	for (let k in req.files["file"]) {
		let v = req.files["file"][k]
		arr[k] = {name : v.name , md5 : v.md5}
		console.log( v )
		console.log( arr )
		v.mv('./data/' + v.md5 + path.extname(v.name) , function(err) {
			if (err) {
				console.log(err);
			}
		});
	}

	res.send( "ok" )
});


//

app.get('/', function(req, res) {
	res.sendFile( __dirname + "/src/index.html")
});

app.get('/robots.txt', function(req, res) {
	res.set ('Content-Type', 'text/plain')
	res.sendFile( __dirname + "/src/robot.txt")
});

app.get('/favicon.ico', function(req, res) {
	res.sendFile( __dirname + "/src/favicon.ico")
});

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

	let fileName = req.params.name
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

	let fileName = req.params.name
	res.sendFile(fileName, options, function (err) {
		if (err) {
			next(err)
		}
	})
})

app.get('*', function(req, res) {
	res.sendFile( __dirname + "/src/index.html")
});

app.listen(80)


})();