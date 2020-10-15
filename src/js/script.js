

const Select = document.querySelector.bind(document);

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

function GrabNews(){

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
		//console.log( dx )
	};
	
	const mouseUpHandler = function() {
		ele.style.cursor = 'grab';
		ele.style.removeProperty('user-select');
	
		document.removeEventListener('mousemove', mouseMoveHandler);
		document.removeEventListener('mouseup', mouseUpHandler);
	};
	
	// Attach the handler
	ele.addEventListener('mousedown', mouseDownHandler);
}



Vue.component('navbar', {
  template: `
	<div class="container">
		<div class="navbar" id= "nav">
			<a href="#Home">HALOGMA</a>
			<div class="dropdown">
				<a class="drop active" href="javascript:void(0);">SOPYMEP</a>
				<div class="drop-content">
					<router-link to="/sopymep" class="drop">Acceuil</router-link>
					<router-link to="/sopymep/news" class="drop">News</router-link>
				</div>
			</div>
			<div class="dropdown">
				<a class="drop" href="#Home">CCMPI</a>
				<div class="drop-content">
					<a href="#Prod1">Lien 1</a>
					<a href="#Prod2">Lien 2</a>
					<a href="#Prod3">Lien 3</a>
				</div>
			</div>
			<div class="dropdown">
				<a class="drop" href="#Home">BETTEGA ET FILS</a>
				<div class="drop-content">
					<a href="#Prod1">Lien 1</a>
					<a href="#Prod2">Lien 2</a>
					<a href="#Prod3">Lien 3</a>
				</div>
			</div>
			<router-link to="/contact" id="Contact">Contact</router-link>
			<a href="javascript:void(0);" class="icon" onclick="displayMenu()"><i class="fa fa-bars"></i></a>
		</div>
		<div class="navbargap"></div>
	</div>`
})

Vue.component('news-card', {
  props: ['id' , 'title' , 'date' , 'desc'],
  template: `
		<article class="card">
			<header class="card-header" style="background-image: url(https://source.unsplash.com/random);">
				<h4 class="card-header--title">News</h4>
			</header>
			<div class="card-body">
				<p class="date">{{date}}</p>
				<h2 class="card-title">{{title}}</h2>
				<p class="body-content">{{desc}}</p>
				<button class="button button-primary">En savoir plus</button>
			</div>
		</article>
	`
})


Vue.component('halogma-form', {
  template: `
		<div class="containerFormulaire" id="ContactForm">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
					<h2>Contact</h2>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xs-offset-3">
					<form id="contact-form" class="form" action="#" method="POST" role="form">
						<div class="form-group">
							<input type="text" class="form-control" id="name" name="name" placeholder="Votre Nom" tabindex="1" required>
						</div>
						<div class="form-group">
							<input type="email" class="form-control" id="email" name="email" placeholder="Votre E-mail" tabindex="2" required>
						</div>
						<div class="form-group">
							<input type="text" class="form-control" id="subject" name="subject" placeholder="Objet" tabindex="3" required>
						</div>
						<div class="form-group">
							<textarea rows="5" cols="50" name="message" class="form-control" id="message" placeholder="Message..." tabindex="4" required></textarea>
						</div>
						<div class="text-center">
							<div class="envoie"><button type="submit" class="button button-primary">Envoyer Message</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	`
})

const Bar = { template: '<div>bar</div>' }

const sopymep = { template: `
	<div>
		<navbar></navbar>
		<transition name="fade">
			<div>
				<div class="container presentation" >
					<h1><div class="logo">SOPYMEP</div> du groupe HALOGMA</h1>
				</div>
				<hr>
			</div>
		</transition>
	</div>
` }

const sopymepnews = { 
	props: [ 'posts' ], 
	template: `
	<div>
		<navbar></navbar>
		<transition name="fade">
			<div>
				<div class="container title">
					<div>News</div>
				</div>
				<div class="card-list container info" id="card-list">
					<news-card v-for="post in posts" v-bind:key="post.id" v-bind:title="post.title"></news-card>
				</div>
			</div>
		</transition>
	</div>
` }

const contact = { 
	template: `
	<div>
		<navbar></navbar>
		<transition name="fade">
			<halogma-form></halogma-form>
		</transition>
	</div>
` }

const routes = [

	{ 
		path: '/sopymep', 
		component: sopymep , 

	},
	{ 
		path: '/sopymep/news', 
		component: sopymepnews ,
		props: {
			posts: [
			  { id: 1, title: 'Mon initiation avec Vue' , date : '25 mars 2020' , desc : 'desc' },
			  { id: 2, title: 'Blogger avec Vue' , date : '25 mars 2020' , desc : 'desc' },
			  { id: 3, title: 'Pourquoi Vue est tellement cool' , date : '25 mars 2020' , desc : 'desc' },
			  { id: 4, title: 'vuejs yay' , date : '25 mars 2020' , desc : 'desc' }
			],
		}  
		
	},
	{ 
		path: '/contact', 
		component: contact , 

	},
	{ path: '/news/:id', component: Bar }
]

const router = new VueRouter({
  routes, // raccourci pour `routes: routes`

})


let vm = new Vue({
  router : router,
  el: '#app',
  data: {
	posts: [
	  { id: 1, title: 'Mon initiation avec Vue' , date : '25 mars 2020' , desc : 'desc' },
	  { id: 2, title: 'Blogger avec Vue' , date : '25 mars 2020' , desc : 'desc' },
	  { id: 3, title: 'Pourquoi Vue est tellement cool' , date : '25 mars 2020' , desc : 'desc' },
	  { id: 4, title: 'vuejs yay' , date : '25 mars 2020' , desc : 'desc' }
	]
  },
  computed: {
  }
})

router.beforeEach((to, from, next) => {
	HideNavbar()
	next()
})


//GrabNews()