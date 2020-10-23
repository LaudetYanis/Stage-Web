const crypto = require('crypto');
const path = require("path");
const express = require('express');
const app = express();
const auth = require('http-auth');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const sqlite = require('./aa-sqlite.js');
const cookieParser = require('cookie-parser')
const axios = require('axios')

const nodemailer = require("nodemailer");



//const AuthenticationContext = require('adal-node').AuthenticationContext;
// 
//let clientId = '2ab88adf-7328-4e59-b542-e594da3c21bb';
//let clientSecret = 'EH2_5z-v3k7b.kkExnYvNB6Ex3N-DF35fu'
//let authorityHostUrl = 'https://login.windows.net';
//let tenant = 'ba45cba8-42a7-40ed-8f50-a391fa7a6e79';
//let authorityUrl = authorityHostUrl + '/' + tenant;
//let redirectUri = 'http://localhost/ms/getAToken';
//let resource = '00000002-0000-0000-c000-000000000000';
//let templateAuthzUrl = 'https://login.windows.net/' + 
//						tenant + 
//						'/oauth2/authorize?response_type=code&client_id=' +
//						clientId + 
//						'&redirect_uri=' + 
//						redirectUri + 
//						'&state=<state>&resource=' + 
//						resource;

//function createAuthorizationUrl(state) {
//  return templateAuthzUrl.replace('<state>', state);
//}

const readFile = (path, opts = 'utf8') =>
    new Promise((resolve, reject) => {
        fs.readFile(path, opts, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })

async function SendDevisMail(receiver) {

    if (true) {
        return // a voir plus tard
    }

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    let info = await transporter.sendMail({
        from: '"Halogma" <noreply@halogma.fr>',
        to: receiver,
        subject: "Demande de devis",
        html: await readFile('./mail/index.html'),
    });

    console.log(info)

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}

//SendDevisMail("alf.hammes@ethereal.email")

;
(async() => {

    console.log(await sqlite.open('./sopymep.db'))


    //await sqlite.run( `DROP TABLE IF EXISTS Devis`)

    await sqlite.run(`
	CREATE TABLE IF NOT EXISTS Devis (
	devis_id INTEGER PRIMARY KEY, 
	nom VARCHAR(128),
	email VARCHAR(320),
	tel VARCHAR(10),
	date DATETIME DEFAULT CURRENT_TIMESTAMP,
	pourle DATETIME,
	entreprise VARCHAR(128),
	message TEXT,
	files TEXT
)`)

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser())

    app.use(fileUpload({
        limits: {
            fileSize: 20000000 //20mb
        },
        abortOnLimit: true,
        useTempFiles: true,
        tempFileDir: '/tmp/'
    }));

    const basic = auth.basic({
        realm: "Admin",
        file: __dirname + "/admin.htpasswd" // user:admin114, pass:zDvzxU0RNqSaugdxzxIi
    });

    // API 

    function ValidateEmail(mail) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
            return true
        }
        return false
    }

    function escapeString(val) {
        if (!val) { return val };
        val = val.replace(/[\0\n\r\b\t\\'"\x1a]/g, function(s) {
            switch (s) {
                case "\0":
                    return "\\0";
                case "\n":
                    return "\\n";
                case "\r":
                    return "\\r";
                case "\b":
                    return "\\b";
                case "\t":
                    return "\\t";
                case "\x1a":
                    return "\\Z";
                case "'":
                    return "''";
                case '"':
                    return '""';
                default:
                    return "\\" + s;
            }
        });
        return val;
    };

    app.post('/api/contact', async function(req, res) {

        console.log(req.body)

        if (!req.body.name || req.body.name.trim().length < 1 || req.body.name.length > 128) {
            res.json({
                err: "nom invalide",
                status: 500
            })
            return
        }

        if (req.body.company && req.body.company.length > 128) {
            res.json({
                err: "entreprise invalide",
                status: 500
            })
            return
        }

        req.body.company = req.body.company || 'NULL';

        if (req.body.text && req.body.text.length > 500) {
            res.json({
                err: "message invalide",
                status: 500
            })
            return
        }

        if (req.body.phone && req.body.phone.length > 10) {
            res.json({
                err: "téléphone invalide",
                status: 500
            })
            return
        }

        req.body.phone = req.body.phone || 'NULL';

        if (!req.body.date) {
            res.json({
                err: "date invalide",
                status: 500
            })
            return
        }

        req.body.date = Number(req.body.date)

        if (!req.body.email || !ValidateEmail(req.body.email) || req.body.email.length > 320) {
            res.json({
                err: "email invalide",
                status: 500
            })
            return
        }

        //console.log( req.files )


        let arr = []

        if (req.files) {
            if (!req.files["file"][0]) { // stupide
                let file = req.files["file"]
                req.files["file"] = []
                req.files["file"][0] = file
            }

            for (let k in req.files["file"]) {
                let v = req.files["file"][k]

                arr[k] = { name: escapeString(v.name), md5: v.md5 }

                v.mv('./data/' + v.md5 + ".dat", function(err) {
                    if (err) {
                        res.json({
                            err: err,
                            status: 500
                        })
                        return
                    }
                });
            }
        }

        console.log(arr)

        try {
            let success = await sqlite.run(`INSERT INTO Devis (nom , email , tel , date , pourle , entreprise , message , files ) 
			VALUES( '${escapeString(req.body.name)}', '${escapeString(req.body.email)}' , '${escapeString(req.body.phone)}' , '${Date.now()}', '${req.body.date}', '${escapeString(req.body.company)}', '${escapeString(req.body.text)}', '${JSON.stringify(arr)}' );
		`)

            try {
                await SendDevisMail(req.body.email)
            } catch (e) {
                res.json({
                    err: "Inpossible d'envoyer un mail à " + req.body.email,
                    status: 500
                })
                return
            }


            res.json({
                err: null,
                status: 200
            })

            return

        } catch (e) {
            console.log(e)
            res.json({
                err: e + "",
                status: 500
            })
            return
        }

    });

    app.get('/api/devis', basic.check(async function(req, res) {
        let r = await sqlite.all("SELECT * FROM Devis ORDER BY date DESC", [])

        r.forEach(function(row) {
            row.files = JSON.parse(row.files)
        })
        res.json(r);
    }));

    async function IsFileUseless(filemd5) {
        new Promise(async(resolve, reject) => {
            // consequence de mon shitcode

            let files = []

            let r = await sqlite.all(`SELECT * FROM Devis`, [])

            r.forEach(function(row) {
                row.files = JSON.parse(row.files)

                for (const k of row.files) {
                    files[row.files[k].md5] = true
                }
            })

            console.log(files)

            resolve(files[filemd5] == undefined)
        })
    }

    app.get('/api/delete/:id', basic.check(async function(req, res) {

        try {
            let id = req.params.id
            let rows = await sqlite.all(`SELECT * FROM Devis WHERE devis_id = ${ id }`, [])

            let files = JSON.parse(rows[0].files)

            let success = await sqlite.run(`DELETE FROM Devis WHERE devis_id = ${ id };`)

            for (const k of files) {
                let v = files[k]
                if (await IsFileUseless(v.md5)) {
                    console.log(v.name, "is useless")
                } else {
                    console.log(v.name, "is not useless")
                }
            }

        } catch (e) {
            res.json({ err: e + "", status: 500 })
            return
        }

        res.json({ err: null, status: 200 })

    }));


    app.get('/api/file/:name', basic.check(async function(req, res) {
        var options = {
            root: path.join(__dirname, 'data'),
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true,
            }
        }

        let fileName = req.params.name + ".dat"
        res.sendFile(fileName, options, function(err) {
            if (err) {
                next(err)
            }
        })
    }));


    //

    app.get('/', function(req, res) {
        res.sendFile(__dirname + "/src/index.html")
    });

    app.get('/robots.txt', function(req, res) {
        res.set('Content-Type', 'text/plain')
        res.sendFile(__dirname + "/src/robot.txt")
    });

    app.get('/favicon.ico', function(req, res) {
        res.sendFile(__dirname + "/src/favicon.ico")
    });

    app.get('/admin', basic.check((req, res) => {
        //res.end(`Welcome to private area - ${req.user}!`);
        res.sendFile(__dirname + "/src/adminmenu.html")
    }));

    app.get('/admin/inbox', basic.check((req, res) => {
        //res.end(`Welcome to private area - ${req.user}!`);
        res.sendFile(__dirname + "/src/admin.html")
    }));

    app.get('/admin/news', basic.check((req, res) => {
        //res.end(`Welcome to private area - ${req.user}!`);
        res.sendFile(__dirname + "/src/postnews.html")
    }));

    let domain = "http://www.example.com/"

    app.get('/sitemap.xml', async function(req, res, next) {
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



    app.get('/css/:name', function(req, res, next) {
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
        res.sendFile(fileName, options, function(err) {
            if (err) {
                next(err)
            }
        })
    })

    app.get('/js/:name', function(req, res, next) {
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
        res.sendFile(fileName, options, function(err) {
            if (err) {
                next(err)
            }
        })
    })

    // Clients get redirected here in order to create an OAuth authorize url and redirect them to AAD.
    // There they will authenticate and give their consent to allow this app access to
    // some resource they own.
    //app.get('/ms/auth', function(req, res) {
    //	crypto.randomBytes(48, function(ex, buf) {
    //		var token = buf.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
    //		
    //		res.cookie('authstate', token);
    //		var authorizationUrl = createAuthorizationUrl(token);
    //		
    //		res.redirect(authorizationUrl);
    //	});
    //});

    // After consent is granted AAD redirects here.  The ADAL library is invoked via the
    // AuthenticationContext and retrieves an access token that can be used to access the
    // user owned resource.
    //app.get('/ms/getAToken', function(req, res) {
    //
    //	if (!req.cookies.authstate) {
    //		res.send('error: no cookies');
    //		return
    //	}
    //
    //	if (req.cookies.authstate !== req.query.state) {
    //		res.send('error: state does not match');
    //		return
    //	}
    //	
    //	var authenticationContext = new AuthenticationContext(authorityUrl);
    //	
    //	authenticationContext.acquireTokenWithAuthorizationCode(
    //		req.query.code,
    //		redirectUri,
    //		resource,
    //		clientId, 
    //		clientSecret,
    //		async function(err, response) {
    //			var message = '';
    //			if (err) {
    //			  message = 'error: ' + err.message + '\n';
    //			}
    //			message += 'response: ' + JSON.stringify(response);
    //			
    //			console.log ( response )
    //
    //			let options = {
    //				method: 'POST',
    //				url: "https://outlook.office.com/api/v2.0/me/taskfolders('salut')/tasks",
    //				headers:{
    //					'Authoization' : "Baerer " + response.accessToken,
    //				},
    //				body:{
    //						"Subject": "Shop for dinner",
    //						"StartDateTime": {
    //							"DateTime": "2016-04-23T18:00:00",
    //							"TimeZone": "Pacific Standard Time"
    //						},
    //						"DueDateTime":  {
    //							"DateTime": "2016-04-25T13:00:00",
    //							"TimeZone": "Pacific Standard Time"
    //						}
    //					}
    //				},
    //				json: true,
    //			}
    //
    //			let rep = await axios(options);
    //			console.log( rep )
    //		}
    //	);
    //	
    //});

    app.get('*', function(req, res) {
        res.sendFile(__dirname + "/src/index.html")
    });

    app.listen(80)


})();