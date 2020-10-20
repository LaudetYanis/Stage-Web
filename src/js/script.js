



var DOMAnimations = {
	
	/**
	* SlideUp
	*
	* @param {HTMLElement} element
	* @param {Number} duration
	* @returns {Promise<boolean>}
	*/
	slideUp: function (element, duration = 200) {

		return new Promise(function (resolve, reject) {

			element.style.height = element.offsetHeight + 'px';
			element.style.transitionProperty = `height, margin, padding`;
			element.style.transitionDuration = duration + 'ms';
			element.offsetHeight;
			element.style.overflow = 'hidden';
			element.style.height = 0;
			element.style.paddingTop = 0;
			element.style.paddingBottom = 0;
			element.style.marginTop = 0;
			element.style.marginBottom = 0;
			window.setTimeout(function () {
				element.style.display = 'none';
				element.style.removeProperty('height');
				element.style.removeProperty('padding-top');
				element.style.removeProperty('padding-bottom');
				element.style.removeProperty('margin-top');
				element.style.removeProperty('margin-bottom');
				element.style.removeProperty('overflow');
				element.style.removeProperty('transition-duration');
				element.style.removeProperty('transition-property');
				resolve(false);
			}, duration)
		})
	},

	/**
	* SlideDown
	*
	* @param {HTMLElement} element
	* @param {Number} duration
	* @returns {Promise<boolean>}
	*/
	slideDown: function (element, duration = 200) {

		return new Promise(function (resolve, reject) {

			element.style.removeProperty('display');
			let display = window.getComputedStyle(element).display;

			if (display === 'none') 
				display = 'block';

			element.style.display = display;
			let height = element.offsetHeight;
			element.style.overflow = 'hidden';
			element.style.height = 0;
			element.style.paddingTop = 0;
			element.style.paddingBottom = 0;
			element.style.marginTop = 0;
			element.style.marginBottom = 0;
			element.offsetHeight;
			element.style.transitionProperty = `height, margin, padding`;
			element.style.transitionDuration = duration + 'ms';
			element.style.height = height + 'px';
			element.style.removeProperty('padding-top');
			element.style.removeProperty('padding-bottom');
			element.style.removeProperty('margin-top');
			element.style.removeProperty('margin-bottom');
			window.setTimeout(function () {
				element.style.removeProperty('height');
				element.style.removeProperty('overflow');
				element.style.removeProperty('transition-duration');
				element.style.removeProperty('transition-property');
			}, duration)
		})
	},

	/**
	* SlideToggle
	*
	* @param {HTMLElement} element
	* @param {Number} duration
	* @returns {Promise<boolean>}
	*/
	slideToggle: function (element, duration = 200) {

		if (window.getComputedStyle(element).display === 'none') {

			return this.slideDown(element, duration);

		} else {

			return this.slideUp(element, duration);
		}
	}
}

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

function HideNavbar( exept ){

	let el = document.querySelectorAll(".has-dropdown")

	el.forEach( d => {
		d.style.display = "none"

		setTimeout(()=>{
			d.style.display = ""
		},1)
	});

}



function HookNavbar(){

	// Get all "navbar-burger" elements
	const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

	// Check if there are any navbar burgers
	if ($navbarBurgers.length > 0) {

		// Add a click event on each of them
		$navbarBurgers.forEach( el => {
			el.addEventListener('click', () => {

				// Get the target from the "data-target" attribute
				const target = el.dataset.target;
				const $target = document.getElementById(target);

				console.log( el )

				// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
				el.classList.toggle('is-active');
				$target.classList.toggle('is-active');

			});
		});


		let f = function ( el ){
			el.addEventListener('click', () => {
				$navbarBurgers.forEach( el => {
					const target = el.dataset.target;
					const $target = document.getElementById(target);
					el.classList.remove('is-active');
					$target.classList.remove('is-active');
				});
			});
		}

		let el = document.querySelectorAll("a.navbar-item.router-link-active")

		el.forEach( el => {
			f( el )
		});

		el = document.querySelectorAll("#navbarDev > div.navbar-start > a")

		el.forEach( el => {
			f( el )
		});

		el = document.querySelector("#navbarDev > div.navbar-end > div > div").childNodes

		el.forEach( el => {
			f( el )
		});


		console.log( el )


	}
}



function GrabNews(){

	const ele = document.getElementById('card-list');

	if( !ele ) return;
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
		<div class="navbar shadow-lg" id= "nav">
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
			<a href="javascript:void(0);" class="icon" aria-label="menu" onclick="displayMenu()"><i class="fa fa-bars"></i></a>
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
				<router-link class="button button-primary" v-bind:to="'/news/'+ this.id"id="Contact">
					<button class="button button-primary">En savoir plus</button>
				</router-link>
			</div>
		</article>
	`
})

Vue.component('news-card2', {
  props: ['id' , 'title' , 'date' , 'desc'],
  template: `

		<div class="card">
			<router-link v-bind:to="'/news/'+ this.id" >
				<div class="card-image">
					<figure class="image is-4by3">
						<img src="https://source.unsplash.com/random/1280x960" alt="Placeholder image">
					</figure>
				</div>
				<div class="card-content">
					<div class="media">
						<div class="media-left">
							<figure class="image is-48x48">
								<img src="https://source.unsplash.com/random/96x96" class="is-rounded" alt="Placeholder image">
							</figure>
						</div>
						<div class="media-content">
							<p class="title is-4">John Smith</p>
							<p class="subtitle is-6">{{date}}</p>
						</div>
					</div>
					<div class="subtitle is-5">
						{{title}}
						<br>
					</div>
				</div>
			</router-link>
		</div>
	`
})



const Bar = { template: '<div>bar</div>' }

const sopymep = { template: `
	<div>
		<div>
			<div class="container presentation" >
				<h1><div class="logo">SOPYMEP</div> du groupe HALOGMA</h1>
			</div>
			<hr>
		</div>
	</div>
` }


const halogma = { template: `
	<div>
		<section class="hero is-large is-primary is-bold">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">Halogma</h1>
					<h2 class="subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h2>
				</div>
			</div>
		</section>
		<section class="section has-background-light shadow-lg">
			<div class="container">
				<h1 class="title" >Titre de la Section</h1>
				<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt, voluptate suscipit vero atque non aut doloribus dolorum esse. Explicabo dolores a hic officia! Tenetur rerum consequuntur a! Voluptates, perferendis corporis!</p>
			</div>
		</section>
		<section class="section">
			<div class="container">
				<div class="tile is-parent">
					<article class="tile is-child notification shadow-lg">
						<router-link to="/sopymep" class="content">
						<p class="title">Sopymep</p>
						<p class="subtitle">Lorem ipsum dolor sit amet</p>
						<div class="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur obcaecati laborum deleniti placeat error vero rerum? Mollitia, rerum iusto? Cupiditate nobis libero, repellat quae nisi laborum fugit doloribus quaerat similique?</div>
						</router-link>
					</article>
				</div>
				<div class="tile is-parent">
					<article class="tile is-child notification shadow-lg">
						<router-link to="/sopymep" class="content">
						<p class="title">CCMPI</p>
						<p class="subtitle">Lorem ipsum dolor sit amet</p>
						<div class="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur obcaecati laborum deleniti placeat error vero rerum? Mollitia, rerum iusto? Cupiditate nobis libero, repellat quae nisi laborum fugit doloribus quaerat similique?</div>
						</router-link>
					</article>
				</div>
				<div class="tile is-parent">
					<article class="tile is-child notification shadow-lg">
						<router-link to="/sopymep" class="content">
						<p class="title">Bettega et fils</p>
						<p class="subtitle">Lorem ipsum dolor sit amet</p>
						<div class="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur obcaecati laborum deleniti placeat error vero rerum? Mollitia, rerum iusto? Cupiditate nobis libero, repellat quae nisi laborum fugit doloribus quaerat similique?
						</div>
						</router-link>
					</article>
				</div>
			</div>
		</section>
	</div>
` }

//const sopymepnews = { 
//	props: [ 'posts' , 'salut' ], 
//	watch: {
//	  $route(to, from) {
//		console.log( to, from )
//	  }
//	},
//	template: `
//	<div>
//		<div>
//			<div class="container title">
//				<div>News</div>
//			</div>
//			<div class="card-list container info" id="card-list">
//				<news-card v-for="post in posts" v-bind:key="post.id" v-bind:title="post.title" v-bind:desc="post.desc" v-bind:date="post.date" v-bind:id="post.id"></news-card>
//			</div>
//		</div>
//	</div>
//` }

const news = { 
	props: [ 'posts' ], 
	watch: {
	  $route(to, from) {
		console.log( to, from )
	  }
	},
	template: `
	<section class="section">
		<div class="container has-text-centered">
			<h2 class="title">Lorem Ipsum</h2>
			<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
			<div class="cardcolumns is-centered has-text-left mx-4" >
				<news-card2 v-for="post in posts" v-bind:key="post.id" v-bind:title="post.title" v-bind:desc="post.desc" v-bind:date="post.date" v-bind:id="post.id"></news-card2>
			</div>
		</div>
		
	</section>
` }


function _linkify(inputText) {
	var replacedText, replacePattern1, replacePattern2, replacePattern3;

	//URLs starting with http://, https://, or ftp://
	replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
	replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

	//URLs starting with "www." (without // before it, or it'd re-link the ones done above).
	replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
	replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

	//Change email addresses to mailto:: links.
	replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
	replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

	return replacedText;
}

const sopymeparticle = { 
	props: [ 'posts' , 'article' , 'id' ] , 
	methods: {
		  linkify: function ( p ) {
			console.log( p )
			return _linkify( p )
		  }
		},
	template: `
	<div>
		<div class="wrapper">
			<div class="news-container">
				<div class="news__header">
					<img class="header__thumbnail" src="https://source.unsplash.com/1920x1080/" alt="" />
				</div>
				
				<div class="news__body">
					<h1 class="body__heading">{{article.title}}</h1>
					
					<small class="body__meta">{{article.date}}</small>
					
					<p class="body__text" v-for="v in (article.content.split('\\n'))">{{v}}</p>
				</div>
			</div>
		</div>
		<div>
			
		</div>
	</div>
` }

const contact = { 
	//props: ['name','email','date','phone','company','text'],
	data:function(){
		return { name: '', email: '', date: new Date() , phone: '', company: '' , text:'' , files: [] , size: 0 , maxsize: 20000000 };
	},

	methods: {


		ValidateEmail: function(mail) {
			if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)){
				return true
			}
			return false
		},
		handleFileUpload: function (event) {
			this.size = 0;
			this.files = this.$refs.file.files;

			for (const [k, v] of Object.entries(this.files)) {
				console.log( k , v )
				this.size += v.size
			}

			console.log( this.size )
		},
		Valid: function() {

			if(this.size > this.maxsize){
				return false
			}

			if(!this.ValidateEmail(this.email)){
				return false
			}

			if(!this.ValidateEmail(this.email)){
				return false
			}

			if( this.name.trim().length < 1 ){
				return false
			}

			if( this.text.trim().length < 1 ){
				return false
			}

			return true;
		},
		Send : function(){

			let formData = new FormData();

			console.log( this.name )

			formData.append('name', this.name);
			formData.append('email', this.email);
			formData.append('date', this.date.getTime());
			formData.append('phone', this.phone);
			formData.append('company', this.company);
			formData.append('text', this.text);
			
			for (const [k, v] of Object.entries(this.files)) {
				formData.append('file', v);
			}


			axios.post( '/api/contact',
				formData,{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			)

		},
	},
	template: `
	<div>
		<div class="container containerFormulaire box shadow-lg" id="ContactForm">
			<template>
				<section>
					<h1 class="title is-3">Demande de devis</h1>
					<b-field label="Nom">
						<b-input  placeholder="Nom"
							v-model="name"
							type="text"
							icon="account">
						</b-input required>
					</b-field>

					<b-field label="Email">
						<b-input  placeholder="Email"
							v-model="email"
							type="email"
							icon="email">
						</b-input required>
					</b-field>

					<b-field label="Tél">
						<b-input placeholder="0XXXXXXXXX"
							v-model="phone"
							id="phone"
							type="tel"
							pattern="^(?:(?:\\+|00)33[\\s.-]{0,3}(?:\\(0\\)[\\s.-]{0,3})?|0)[1-9](?:(?:[\\s.-]?\\d{2}){4}|\\d{2}(?:[\\s.-]?\\d{3}){2})$"
							icon="phone"
							class="">
						</b-input required>
					</b-field>

					<b-field label="Entreprise">
						<b-input  placeholder="Entreprise"
							v-model="company"
							type="text"
							icon="city">
						</b-input required>
					</b-field>

					<b-field label="Pour le">
						<b-datepicker
							v-model="date"
							placeholder="Type or select a date..."
							icon="calendar-today"
							editable>
						</b-datepicker>
					</b-field>
			
					<b-field label="Message">
						<b-input maxlength="500" type="textarea" v-model="text"></b-input>
					</b-field>

					<b-field label="20mo max">
						<div class="file has-name my-4">
							<label class="file-label shadow-lg">
								<input class="file-input" type="file" name="fichies" ref="file" v-on:change="handleFileUpload()" multiple>
								<span class="file-cta">
									<span class="file-icon">
									  <i class="fas fa-upload"></i>
									</span>
									<span class="file-label">
										Choisir des fichiers...
									</span>
								</span>
								<span class="file-name button" v-if="files[0] != null" v-bind:class="{ 'is-danger': size > maxsize }" v-for="(value, name, index) in files">
									{{value.name}}
								</span>
							</label>
						</div>
					</b-field>

					<button class="button is-info shadow-lg my-4 " :disabled="!Valid()" v-on:click="Send()">Envoyer</button>
					
				</section>
			</template>
		</div>
	</div>
` }

const _404 = { 
	template: `
	<div id="main">
		<div class="fof">
				<h1>Error 404</h1>
		</div>
	</div>
` }

const routes = [
	{ 
		path: '/', 
		component: halogma , 

	},
	{ 
		path: '/sopymep', 
		component: sopymep , 

	},
	{ 
		path: '/news', 
		component: news ,
		props: {
			posts: [
			  { id: 1, title: 'Mon initiation avec Vue' , date : '25 mars 2020' , desc : 'desc' },
			  { id: 2, title: 'Blogger avec Vue' , date : '25 mars 2020' , desc : 'desc' },
			  { id: 3, title: 'Pourquoi Vue est tellement cool' , date : '25 mars 2020' , desc : 'desc' },
			  { id: 4, title: 'vuejs yay' , date : '25 mars 2020' , desc : '' }
			],
		}
	},
	{ 
		path: '/contact', 
		component: contact , 
		

	},
	{ 
		path: '/news/:id', 
		component: sopymeparticle ,
		
		props: {
			
			posts: [
			  { id: 1, title: 'Mon initiation avec Vue' , date : '25 mars 2020' , desc : 'desc' },
			  { id: 2, title: 'Blogger avec Vue' , date : '25 mars 2020' , desc : 'desc' },
			  { id: 3, title: 'Pourquoi Vue est tellement cool' , date : '25 mars 2020' , desc : 'desc' },
			  { id: 4, title: 'vuejs yay' , date : '25 mars 2020' , desc : 'Ob haec et huius modi multa, quae cernebantur in paucis, omnibus timeri sunt coepta. et ne tot malis dissimulatis paulatimque serpentibus acervi crescerent aerumnarum, nobilitatis decreto legati mittuntur: Praetextatus ex urbi praefecto et ex vicario Venust' }
			],
			article: {
				date: "25 mars 2020",
				desc: "salut desc",
				title: "salut title",
				content : `Cumque pertinacius ut legum gnarus https://vuejs.org/v2/guide/components.html accusatorem flagitaret atque sollemnia, doctus id Caesar libertatemque superbiam ratus tamquam obtrectatorem audacem excarnificari praecepit, qui ita evisceratus ut cruciatibus membra deessent, inplorans caelo iustitiam, torvum renidens fundato pectore mansit inmobilis nec se incusare nec quemquam alium passus et tandem nec confessus nec confutatus cum abiecto consorte poenali est morte multatus. et ducebatur intrepidus temporum iniquitati insultans, imitatus Zenonem illum veterem Stoicum qui ut mentiretur quaedam laceratus diutius, avulsam sedibus linguam suam cum cruento sputamine in oculos interrogantis Cyprii regis inpegit.
Denique Antiochensis ordinis vertices sub uno elogio iussit occidi ideo efferatus, quod ei celebrari vilitatem intempestivam urgenti, cum inpenderet inopia, gravius rationabili responderunt; et perissent ad unum ni comes orientis tunc Honoratus fixa constantia restitisset.
Raptim igitur properantes ut motus sui rumores celeritate nimia praevenirent, vigore corporum ac levitate confisi per flexuosas semitas ad summitates collium tardius evadebant. et cum superatis difficultatibus arduis ad supercilia venissent fluvii Melanis alti et verticosi, qui pro muro tuetur accolas circumfusus, augente nocte adulta terrorem quievere paulisper lucem opperientes. arbitrabantur enim nullo inpediente transgressi inopino adcursu adposita quaeque vastare, sed in cassum labores pertulere gravissimos.
Post emensos insuperabilis expeditionis eventus languentibus partium animis, quas periculorum varietas fregerat et laborum, nondum tubarum cessante clangore vel milite locato per stationes hibernas, fortunae saevientis procellae tempestates alias rebus infudere communibus per multa illa et dira facinora Caesaris Galli, qui ex squalore imo miseriarum in aetatis adultae primitiis ad principale culmen insperato saltu provectus ultra terminos potestatis delatae procurrens asperitate nimia cuncta foedabat. propinquitate enim regiae stirpis gentilitateque etiam tum Constantini nominis efferebatur in fastus, si plus valuisset, ausurus hostilia in auctorem suae felicitatis, ut videbatur.
Hae duae provinciae bello quondam piratico catervis mixtae praedonum a Servilio pro consule missae sub iugum factae sunt vectigales. et hae quidem regiones velut in prominenti terrarum lingua positae ob orbe eoo monte Amano disparantur.
Qui cum venisset ob haec festinatis itineribus Antiochiam, praestrictis palatii ianuis, contempto Caesare, quem videri decuerat, ad praetorium cum pompa sollemni perrexit morbosque diu causatus nec regiam introiit nec processit in publicum, sed abditus multa in eius moliebatur exitium addens quaedam relationibus supervacua, quas subinde dimittebat ad principem.
Sed fruatur sane hoc solacio atque hanc insignem ignominiam, quoniam uni praeter se inusta sit, putet esse leviorem, dum modo, cuius exemplo se consolatur, eius exitum expectet, praesertim cum in Albucio nec Pisonis libidines nec audacia Gabini fuerit ac tamen hac una plaga conciderit, ignominia senatus.
Et prima post Osdroenam quam, ut dictum est, ab hac descriptione discrevimus, Commagena, nunc Euphratensis, clementer adsurgit, Hierapoli, vetere Nino et Samosata civitatibus amplis inlustris.
Et licet quocumque oculos flexeris feminas adfatim multas spectare cirratas, quibus, si nupsissent, per aetatem ter iam nixus poterat suppetere liberorum, ad usque taedium pedibus pavimenta tergentes iactari volucriter gyris, dum exprimunt innumera simulacra, quae finxere fabulae theatrales.
Adolescebat autem obstinatum propositum erga haec et similia multa scrutanda, stimulos admovente regina, quae abrupte mariti fortunas trudebat in exitium praeceps, cum eum potius lenitate feminea ad veritatis humanitatisque viam reducere utilia suadendo deberet, ut in Gordianorum actibus factitasse Maximini truculenti illius imperatoris rettulimus coniugem.
Intellectum est enim mihi quidem in multis, et maxime in me ipso, sed paulo ante in omnibus, cum M. Marcellum senatui reique publicae concessisti, commemoratis praesertim offensionibus, te auctoritatem huius ordinis dignitatemque rei publicae tuis vel doloribus vel suspicionibus anteferre. Ille quidem fructum omnis ante actae vitae hodierno die maximum cepit, cum summo consensu senatus, tum iudicio tuo gravissimo et maximo. Ex quo profecto intellegis quanta in dato beneficio sit laus, cum in accepto sit tanta gloria.
Quapropter a natura mihi videtur potius quam ab indigentia orta amicitia, applicatione magis animi cum quodam sensu amandi quam cogitatione quantum illa res utilitatis esset habitura. Quod quidem quale sit, etiam in bestiis quibusdam animadverti potest, quae ex se natos ita amant ad quoddam tempus et ab eis ita amantur ut facile earum sensus appareat. Quod in homine multo est evidentius, primum ex ea caritate quae est inter natos et parentes, quae dirimi nisi detestabili scelere non potest; deinde cum similis sensus exstitit amoris, si aliquem nacti sumus cuius cum moribus et natura congruamus, quod in eo quasi lumen aliquod probitatis et virtutis perspicere videamur.
Superatis Tauri montis verticibus qui ad solis ortum sublimius attolluntur, Cilicia spatiis porrigitur late distentis dives bonis omnibus terra, eiusque lateri dextro adnexa Isauria, pari sorte uberi palmite viget et frugibus minutis, quam mediam navigabile flumen Calycadnus interscindit.
Rogatus ad ultimum admissusque in consistorium ambage nulla praegressa inconsiderate et leviter proficiscere inquit ut praeceptum est, Caesar sciens quod si cessaveris, et tuas et palatii tui auferri iubebo prope diem annonas. hocque solo contumaciter dicto subiratus abscessit nec in conspectum eius postea venit saepius arcessitus.
Quam ob rem id primum videamus, si placet, quatenus amor in amicitia progredi debeat. Numne, si Coriolanus habuit amicos, ferre contra patriam arma illi cum Coriolano debuerunt? num Vecellinum amici regnum adpetentem, num Maelium debuerunt iuvare?
Eo adducta re per Isauriam, rege Persarum bellis finitimis inligato repellenteque a conlimitiis suis ferocissimas gentes, quae mente quadam versabili hostiliter eum saepe incessunt et in nos arma moventem aliquotiens iuvant, Nohodares quidam nomine e numero optimatum, incursare Mesopotamiam quotiens copia dederit ordinatus, explorabat nostra sollicite, si repperisset usquam locum vi subita perrupturus.
Ut enim benefici liberalesque sumus, non ut exigamus gratiam (neque enim beneficium faeneramur sed natura propensi ad liberalitatem sumus), sic amicitiam non spe mercedis adducti sed quod omnis eius fructus in ipso amore inest, expetendam putamus.
Per hoc minui studium suum existimans Paulus, ut erat in conplicandis negotiis artifex dirus, unde ei Catenae inditum est cognomentum, vicarium ipsum eos quibus praeerat adhuc defensantem ad sortem periculorum communium traxit. et instabat ut eum quoque cum tribunis et aliis pluribus ad comitatum imperatoris vinctum perduceret: quo percitus ille exitio urgente abrupto ferro eundem adoritur Paulum. et quia languente dextera, letaliter ferire non potuit, iam districtum mucronem in proprium latus inpegit. hocque deformi genere mortis excessit e vita iustissimus rector ausus miserabiles casus levare multorum.
Quod cum ita sit, paucae domus studiorum seriis cultibus antea celebratae nunc ludibriis ignaviae torpentis exundant, vocali sonu, perflabili tinnitu fidium resultantes. denique pro philosopho cantor et in locum oratoris doctor artium ludicrarum accitur et bybliothecis sepulcrorum ritu in perpetuum clausis organa fabricantur hydraulica, et lyrae ad speciem carpentorum ingentes tibiaeque et histrionici gestus instrumenta non levia.
Omitto iuris dictionem in libera civitate contra leges senatusque consulta; caedes relinquo; libidines praetereo, quarum acerbissimum extat indicium et ad insignem memoriam turpitudinis et paene ad iustum odium imperii nostri, quod constat nobilissimas virgines se in puteos abiecisse et morte voluntaria necessariam turpitudinem depulisse. Nec haec idcirco omitto, quod non gravissima sint, sed quia nunc sine teste dico.
`
			},
		}

	},
	{ 
		path: '/*', 
		component: _404 ,
	},
]

const router = new VueRouter({
	mode: 'history',
	routes, // raccourci pour `routes: routes`

})


let vm = new Vue({
  router : router,
  el: '#app',
  data: {
	
  },
  computed: {
  }
})

router.beforeEach(async function(to, from, next){
	HideNavbar()

	next()

	setTimeout(function(){
		GrabNews()

		
		
	}, 100);

	//console.log( to, from )
})


console.log( router )

GrabNews()
HookNavbar()









//(function($) { 
//  $(function() { 
//
//	//  open and close nav 
//	$('#navbar-toggle').click(function() {
//	  $('nav ul').slideToggle();
//	});
//
//
//	// Hamburger toggle
//	$('#navbar-toggle').on('click', function() {
//	  this
//	});
//
//
//	// If a link has a dropdown, add sub menu toggle.
//	$('nav ul li a:not(:only-child)').click(function(e) {
//	  $(this).siblings('.navbar-dropdown').slideToggle("slow");
//
//	  // Close dropdown when select another dropdown
//	  $('.navbar-dropdown').not($(this).siblings()).hide("slow");
//	  e.stopPropagation();
//	});
//
//
//	// Click outside the dropdown will remove the dropdown class
//	$('html').click(function() {
//	  $('.navbar-dropdown').hide();
//	});
//  }); 
//})(jQuery); 