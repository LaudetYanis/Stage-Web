

const Select = document.querySelector.bind(document);
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

function displayMenu() {
	var x = document.getElementById("nav");
    if (!x.classList.contains("responsive")) {
        x.classList.add("responsive");
    } else {
        x.classList.remove("responsive");
    }
}

function HideNavbar(){
	Select("#nav").classList.remove("responsive");
}

Select("#Contact").addEventListener("click", function(event){
	HideNavbar();

	ChangeURL("/sopymep/contact")
})



let Path = {}

function Update(){

}

Path["/"] = async function(){
	
}

window.onpopstate = function(event) {
  	if( oldpathname != window.location.pathname){

		if(Path[Pathname()]){
			Update()
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





const ele = document.getElementById('card-list');
ele.style.cursor = 'grab';

let pos = { top: 0, left: 0, x: 0, y: 0 };

const mouseDownHandler = function(e) {
    ele.style.cursor = 'grabbing';
    ele.style.userSelect = 'none';

    pos = {
        left: ele.scrollLeft,
        top: ele.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function(e) {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    ele.scrollTop = pos.top - dy;
    ele.scrollLeft = pos.left - dx;
    console.log( dx )
};

const mouseUpHandler = function() {
    ele.style.cursor = 'grab';
    ele.style.removeProperty('user-select');

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
};

// Attach the handler
ele.addEventListener('mousedown', mouseDownHandler);