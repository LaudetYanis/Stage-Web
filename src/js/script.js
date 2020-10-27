var DOMAnimations = {

    /**
     * SlideUp
     *
     * @param {HTMLElement} element
     * @param {Number} duration
     * @returns {Promise<boolean>}
     */
    slideUp: function(element, duration = 200) {

        return new Promise(function(resolve, reject) {

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
            window.setTimeout(function() {
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
    slideDown: function(element, duration = 200) {

        return new Promise(function(resolve, reject) {

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
            window.setTimeout(function() {
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
    slideToggle: function(element, duration = 200) {

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
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
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

async function POST(url, obj) {
    return new Promise(async function(resolve, reject) {
        try {
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var responseText = this.responseText;
                    try {
                        resolve(responseText)
                    } catch (e) {
                        reject(e)
                    }
                }
            };

            xhttp.open("POST", url, true);
            xhttp.send(JSON.stringify(obj));

        } catch (err) {
            reject(err);
        }
    })
}

async function GET(url) {
    return new Promise(async function(resolve, reject) {
        try {
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var responseText = this.responseText;
                    try {
                        resolve(responseText)
                    } catch (e) {
                        resolve(undefined)
                    }
                }
            };

            xhttp.open("GET", url, true);
            xhttp.send();

        } catch (err) {
            resolve(undefined);
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

function HideNavbar(exept) {

    let el = document.querySelectorAll(".has-dropdown")

    el.forEach(d => {
        d.style.display = "none"

        setTimeout(() => {
            d.style.display = ""
        }, 1)
    });

}



function HookNavbar() {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                console.log(el)

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });


        let f = function(el) {
            el.addEventListener('click', () => {
                $navbarBurgers.forEach(el => {
                    const target = el.dataset.target;
                    const $target = document.getElementById(target);
                    el.classList.remove('is-active');
                    $target.classList.remove('is-active');
                });
            });
        }

        let el = document.querySelectorAll("a.navbar-item.router-link-active")

        el.forEach(el => {
            f(el)
        });

        el = document.querySelectorAll("#navbarDev > div.navbar-start > a")

        el.forEach(el => {
            f(el)
        });

        el = document.querySelector("#navbarDev > div.navbar-end > div > div").childNodes

        el.forEach(el => {
            f(el)
        });
    }
}



function GrabNews() {

    const ele = document.getElementById('card-list');

    if (!ele) return;
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
    props: ['id', 'title', 'date', 'desc'],
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
    props: ['id', 'title', 'date', 'desc', 'image'],
    template: `

		<div class="card">
			<router-link v-bind:to="'/news/'+ this.id" >
				<div class="card-image">
					<figure class="image">
						<img :src="'/images/news/' + image" alt="Placeholder image">
					</figure>
				</div>
				<div class="card-content">
					<div class="media">
						<div class="media-left">
							<figure class="image is-48x48">
								<img src="https://yoyoungdesign.com/IMG/Portfolio/element6-contenu.png" class="is-rounded" alt="Placeholder image">
							</figure>
						</div>
						<div class="media-content">
							<p class="title is-4">{{title}}</p>
							<p class="subtitle is-6">{{date}}</p>
						</div>
					</div>
				</div>
			</router-link>
		</div>
	`
})

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
    data: function() {
        return {
            posts: null
        }
    },
    mounted: async function() {

        let rep = await axios.get('/api/news');
        this.posts = rep.data
    },
    template: `
	<section class="section">
		<div class="container has-text-centered">
			<h2 class="title">Lorem Ipsum</h2>
			<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
			<div class="cardcolumns is-centered has-text-left mx-4" v-if="posts != null" >
				<news-card2 v-for="post in posts" v-bind:key="post.article_id" v-bind:title="post.title" v-bind:image="post.image" v-bind:date="new Date(post.date).toLocaleDateString()" v-bind:id="post.article_id"></news-card2>
			</div>
		</div>
		
	</section>
`
}


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
    data: function() {
        return {
            article: {
                title: "...",
                date: "...",
                content: "..."
            }
        }
    },
    mounted: async function() {

        let rep = await axios.get('/api/news/' + this.$route.params.id);

        if (Object.keys(rep.data).length === 0) {
            router.push({ path: '/news' })
        } else {
            this.article = rep.data[0]
        }

    },
    template: `
	<div>
		<div class="wrapper">
			<div class="news-container">
				<div class="news__header">
					<img class="header__thumbnail" :src="'/images/news/' + article.image" alt="" />
				</div>
				
				<div class="news__body">
					<h1 class="body__heading">{{article.title}}</h1>
					
					<small class="body__meta">{{new Date(article.date).toLocaleDateString() }}</small>
					
					<p class="body__text" v-for="v in (article.content.split('\\n'))">{{v}}</p>
				</div>
			</div>
		</div>
		<div>
			
		</div>
	</div>
`
}


const contact = {
    //props: ['name','email','date','phone','company','text'],
    data: function() {
        return { name: '', email: '', date: new Date(), phone: '', company: '', text: '', files: [], size: 0, maxsize: 20000000, isLoading: false };
    },

    methods: {

        ValidateEmail: function(mail) {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
                return true
            }
            return false
        },
        handleFileUpload: function(event) {
            this.size = 0;
            this.files = this.$refs.file.files;

            for (const [k, v] of Object.entries(this.files)) {
                console.log(k, v)
                this.size += v.size
            }

            console.log(this.size)
        },
        Valid: function() {

            if (this.size > this.maxsize) {
                return false
            }

            if (!this.ValidateEmail(this.email)) {
                return false
            }

            if (this.name.trim().length < 1) {
                return false
            }

            if (this.text.trim().length < 1) {
                return false
            }

            return true;
        },

        HaveErrors: function() {
            if (this.size > this.maxsize) {
                return "Vous avez dépassé la taille limite de pièce jointe"
            }

            if (!this.ValidateEmail(this.email)) {
                return "Votre adresse email n'est pas valide"
            }

            if (this.name.trim().length < 1) {
                return "Votre nom est invalide"
            }

            if (this.text.trim().length < 1) {
                return "Votre message est invalide"
            }

            return "Envoyer";
        },
        Send: async function() {

            this.isLoading = true

            let formData = new FormData();

            formData.append('name', this.name);
            formData.append('email', this.email);
            formData.append('date', this.date.getTime());
            formData.append('phone', this.phone);
            formData.append('company', this.company);
            formData.append('text', this.text);

            for (const [k, v] of Object.entries(this.files)) {
                formData.append('file', v);
            }

            let rep = await axios.post('/api/contact',
                formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )

            console.log(rep)

            if (!rep.data) {
                rep.data = {}
                rep.data.err = "Impossible de se connecter au serveur"
            }

            if (rep.data.err) {
                this.$buefy.dialog.alert({
                    title: 'Erreur',
                    message: rep.data.err,
                    type: 'is-danger',
                    hasIcon: true,
                    icon: 'times-circle',
                    iconPack: 'fa',
                    ariaRole: 'alertdialog',
                    ariaModal: true
                })
            } else {
                this.$buefy.dialog.alert({
                    title: 'Demande de devis',
                    message: 'Votre demande à bien été prise en compte!',
                    confirmText: 'OK!',
                    onConfirm: () => { router.push({ path: '/' }) }
                })
            }

            this.isLoading = false
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
							maxlength="128"
							icon="account">
						</b-input required>
					</b-field>

					<b-field label="Email">
						<b-input  placeholder="Email"
							v-model="email"
							type="email"
							maxlength="320"
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
							maxlength="10"
							class="">
						</b-input required>
					</b-field>

					<b-field label="Entreprise">
						<b-input  placeholder="Entreprise"
							v-model="company"
							maxlength="128"
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

					<b-tooltip
						:label="HaveErrors()" multilined>
						<button class="button shadow-lg my-4 is-primary" :disabled="!Valid()" v-on:click="Send()">Envoyer</button>
					</b-tooltip>
					<b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false"></b-loading>
				</section>
			</template>
		</div>
	</div>
`
}

const _404 = {
    template: `
	<div id="main">
		<div class="fof">
				<h1>Error 404</h1>
		</div>
	</div>
`
}

const ccmpi = {
    template: `
    <div>
	</div>
`
}

const routes = [{
        path: '/',
        component: halogma,

    },
    {
        path: '/sopymep',
        component: sopymep,

    },
    {
        path: '/news',
        component: news,
    },
    {
        path: '/ccmpi',
        component: ccmpi,
    },
    {
        path: '/contact',
        component: contact,


    },
    {
        path: '/news/:id',
        component: sopymeparticle,
    },
    {
        path: '/*',
        component: _404,
    },
]

const router = new VueRouter({
    mode: 'history',
    routes, // raccourci pour `routes: routes`

})


let vm = new Vue({
    router: router,
    el: '#app',
    data: {

    },
    computed: {}
})

router.beforeEach(async function(to, from, next) {
    HideNavbar()

    next()

    //setTimeout(function(){
    //	GrabNews()
    //}, 100);

    window.scrollTo(0, 0)

    //console.log( to, from )
})


//GrabNews()
HookNavbar()



//var element = document.createElement('a');
//element.href = downloadUrl
//const filename = v.Titre + ".mp3" //decodeURI( downloadUrl.substring(downloadUrl.lastIndexOf('/')+1) );
//element.setAttribute('download', filename );
//element.style.display = 'none';
//document.body.appendChild(element);
//element.click();
//document.body.removeChild(element);