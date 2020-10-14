
let oldpathname = window.location.pathname

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return undefined;
}

async function POST( url , obj ) {
	return new Promise(async function(resolve, reject) {
  		try {
  			var xhttp = new XMLHttpRequest();

			xhttp.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
			    var responseText = this.responseText;
			        try{
			          	resolve( responseText )
			        }catch (e) {
			        	reject( e )
			        }
			    }
			};

			xhttp.open("POST", url , true);
			xhttp.send( JSON.stringify( obj ) );

  		} catch (err) {
			reject( err ) ;
  		}
  	})
}

async function GET( url ) {
	return new Promise(async function(resolve, reject) {
  		try {
  			var xhttp = new XMLHttpRequest();

			xhttp.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
			    var responseText = this.responseText;
			        try{
			          	resolve( responseText )
			        }catch (e) {
			        	resolve( undefined )
			        }
			    }
			};

			xhttp.open("GET", url , true);
			xhttp.send();

  		} catch (err) {
			resolve( undefined ) ;
  		}
  	})
}

function Pathname(){
	return window.location.pathname.split("?")[0] || window.location.pathname
}

function ChangeURL(urlPath){

	if( window.location.pathname != urlPath){

		if (history.pushState) {
	    	window.history.pushState("", "" , urlPath);

	    	oldpathname = window.location.pathname

		} else {
		    document.location.href = urlPath;
		}
	
		if(Path[Pathname()]){
			Path[Pathname()]()
		}
	}
	
}

function NAVBAR() {
  var x = document.getElementById("Topnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

let Path = {}

function Update(){

}

Path["/"] = async function(){
	Update()
}
window.onpopstate = function(event) {
  	if( oldpathname != window.location.pathname){

		if(Path[Pathname()]){
			Path[Pathname()]()
		}

		oldpathname = window.location.pathname
	}
}

if( Path[Pathname()] ){
	Path[Pathname()]()
}else{
	ChangeURL("/")
}