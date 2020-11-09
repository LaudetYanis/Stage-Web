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

function HideNavbar() {

    let el = document.querySelectorAll(".has-dropdown")

    el.forEach(d => {
        d.style.display = "none"

        setTimeout(() => {
            d.style.display = ""
        }, 1)
    });

    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {

            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            el.classList.remove('is-active');
            $target.classList.remove('is-active');



        });
    }

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

                //console.log(el)

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

                //console.log("toogle")

            });
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

		<div class="card news__card">
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
                <div class="tile is-parent">
					<article class="tile is-child notification shadow-lg">
						<router-link to="/vidalmp" class="content">
						<p class="title">Vidal MP</p>
						<p class="subtitle">Mécanique de précision</p>
						<div class="content">Aéronautique, Spatial, Recherche sous-marine, Médical, Bâtiment...
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
	<section class="section mt-6">
		<div class="container has-text-centered">
			<h2 class="title">Actualités</h2>
			
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
            loaded: false,
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
            this.article.content = this.article.content.split("\\n")
            this.loaded = true
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
                    
                    <p class="body__text" v-for="v in (article.content)">{{ v }}</p>
                    
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
        
        <div class="container mt-6 mb-6">
            <div class="container is-fluid">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.377546522278!2d1.3451127157221567!3d43.619500362626816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aeb017f06d276d%3A0x57ec0682c2e0ca4!2s1%20Avenue%20Didier%20Daurat%2C%2031770%20Colomiers!5e0!3m2!1sfr!2sfr!4v1604620930109!5m2!1sfr!2sfr" width="100%" height="450px" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
            </div>
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
    data: function() {
        return {
            modal: false,
            Dmodal: false,
            id: 0,
            Did: 0,
            carousel: [
                "c4962a_e5763469824d4d12a66b188b1652fff9.jpg",
                "c4962a_1a2cb1bf821e47c1901c1d3a34a7293a.jpg",
                "c4962a_6ebf328df3db408a8b78a18b6972aad4.jpg",
                "c4962a_89e8725f31384b5dae435ef9341798a5.jpg",
                "c4962a_879a63606a994729b781e5b24463e19b.jpg",
                "c4962a_c5544ac9139e4d95bdf7014afeface41.jpg",
                "c4962a_dce6f55cdbe943a3b6bc16560dc23f66.jpg",
                "c4962a_bef878019e9f46b8864cc57fcf863b31.jpg",
                "c4962a_afb6243a09eb43be8c20a87664d1eab3.jpg",
                "c4962a_5f9724924fbe4cf8b2c2f36893e3a4a7.jpg",
                "c4962a_f127bc70639944869f7ca0ff9434965c.jpg",
                "c4962a_9549389d5c12444ca57708224ded9113.jpg",
                "c4962a_e0e4a884c3514f179e2c3f1872673bb1.jpg",
                "c4962a_df0d9a47c8f4477f9dee37e92c3633c6.jpg",
                "c4962a_5ed37b29c8794cffa08c4d7f89fcc2d1.jpg",
                "c4962a_8da853e4a461456d8dcd5292da301993.jpg",
                "c4962a_3db4b9b47dbb4ca18dbed005cee410c6.jpg",
                "c4962a_a5a46346826a40ab8cbe4762d394a9cd.jpg",
            ],
            derouleur: [{
                    Image: "e360e66d-2f7f-4da1-a095-009516ee3bbb.png",
                    Nom: "Dérouleur/Réenrouleur DREEL120",
                    Desc: "Les anciennes machines ayant eu pour référence REEL et DER ont été regroupées en une machine unique permettant de choisir la fontion voulue ainsi que le sens de rotation du moteur.",
                    Alimentation: "230 V-Mono/50hz",
                    Poids: "8 kg",
                    Encombrement: "(L x l x h) : 303 x 300 x 360mm",
                    Moteur: "courant continu 24V ",
                    Vitesse: "98 mm/s en Ø40",
                    Rouleaux: "Ø 300 mm maxi",
                    Etiquettes: "120mm (mandrin Ø 40)",
                    Options: "-Adaptateurs 40-76"
                },
                {
                    Image: "e360e66d-2f7f-4da1-a095-009516ee3bbb.png",
                    Nom: "Dérouleur/Réenrouleur DREEL120+",
                    Desc: "Les anciennes machines ayant eu pour référence REEL et DER ont été regroupées en une machine unique permettant de choisir la fontion voulue ainsi que le sens de rotation du moteur. La DREEL120+ est une évolution de la DREEL120 avec une motorisation plus rapide.",
                    Alimentation: "230 V-Mono/50hz",
                    Poids: "8 kg",
                    Encombrement: "(L x l x h) : 303 x 300 x 360mm",
                    Moteur: "courant continu 24V ",
                    Vitesse: "98 mm/s en Ø40",
                    Rouleaux: "Ø 300 mm maxi",
                    Etiquettes: "120mm (mandrin Ø 40)",
                    Options: "-Adaptateurs 40-76"
                },
                {
                    Image: "e360e66d-2f7f-4da1-a095-009516ee3bbb.png",
                    Nom: "Dérouleur/Réenrouleur DREEL180",
                    Desc: "Les anciennes machines ayant eu pour référence REEL et DER ont été regroupées en une machine unique permettant de choisir la fontion voulue ainsi que le sens de rotation du moteur.",
                    Alimentation: "230 V-Mono/50hz",
                    Poids: "8 kg",
                    Encombrement: " (L x l x h) : 362 x 300 x 360mm",
                    Moteur: "courant continu 24V",
                    Vitesse: "98 mm/s en Ø40",
                    Rouleaux: "Ø 300 mm maxi",
                    Etiquettes: "180mm (mandrin Ø 40)",
                    Options: "-Adaptateurs 40-76"
                },
                {
                    Image: "e360e66d-2f7f-4da1-a095-009516ee3bbb.png",
                    Nom: "Dérouleur/Réenrouleur DREEL180+",
                    Desc: "Les anciennes machines ayant eu pour référence REEL et DER ont été regroupées en une machine unique permettant de choisir la fontion voulue ainsi que le sens de rotation du moteur. La DREEL180+ est une évolution de la DREEL180 avec une motorisation plus rapide.",
                    Alimentation: "230 V-Mono/50hz",
                    Poids: "8 kg",
                    Encombrement: " (L x l x h) : 362 x 300 x 360mm",
                    Moteur: "courant continu 24V",
                    Vitesse: "98 mm/s en Ø40",
                    Rouleaux: "Ø 300 mm maxi",
                    Etiquettes: "180mm (mandrin Ø 40)",
                    Options: "-Adaptateurs 40-76"
                },
                {
                    Image: "46e81a18-0d2d-4a94-9fe3-798e7b.png",
                    Nom: "Réenrouleur PREEL120",
                    Desc: "Disposant d'une capacité d'enroulement inférieure à celle du DREEL120 et offrant de grandes possibilités de par son faible encombrement, le PREEL120 est idéalement conçu pour fonctionner avec de petites imprimantes.",
                    Alimentation: "230 V-Mono/50hz",
                    Poids: "4 kg",
                    Encombrement: "(L x l x h) : 289 x 218 x 230mm",
                    Moteur: "courant continu 24V",
                    Vitesse: "98 mm/s en Ø40",
                    Rouleaux: "Ø 200 mm maxi",
                    Etiquettes: "jusqu'à 120 mm (mandrin Ø 40)",
                    Options: "-Adaptateur 40-76"
                },
                {
                    Image: "46e81a18-0d2d-4a94-9fe3-798e7b.png",
                    Nom: "Réenrouleur PREEL120+",
                    Desc: "Disposant d'une capacité d'enroulement inférieure à celle du DREEL120 et offrant de grandes possibilités de par son faible encombrement, le PREEL120 est idéalement conçu pour fonctionner avec de petites imprimantes. La PREEL120+ est une évolution de la PREEL 120 avec une motorisation plus rapide.",
                    Alimentation: "230 V-Mono/50hz",
                    Poids: "4 kg",
                    Encombrement: "(L x l x h) : 289 x 218 x 230mm",
                    Moteur: "courant continu 24V",
                    Vitesse: "218 mm/s en Ø40",
                    Rouleaux: "Ø 200 mm maxi",
                    Etiquettes: "jusqu'à 120 mm (mandrin Ø 40)",
                    Options: "-Adaptateur 40-76"
                },
                {
                    Image: "eb3367_f0de04ce40cb4b4c957a7eead3117416.png",
                    Nom: "Dérouleur/réenrouleur PDE 120",
                    Desc: "Disposant d'une capacité d'enroulement inférieure à celle du DREEL120 et offrant de grandes possibilités de par son faible encombrement, le PREEL120 est idéalement conçu pour fonctionner avec de petites imprimantes. La PREEL120+ est une évolution de la PREEL 120 avec une motorisation plus rapide.",
                    Alimentation: "230 V-Mono/50hz",
                    Poids: "4 kg",
                    Encombrement: "(L x l x h) : 289 x 218 x 230mm",
                    Moteur: "courant continu 24V",
                    Vitesse: "218 mm/s en Ø40",
                    Rouleaux: "Ø 200 mm maxi",
                    Etiquettes: "jusqu'à 120 mm (mandrin Ø 40)",
                    Options: "-Adaptateur 40-76"
                },
                {
                    Image: "eb3367_f0de04ce40cb4b4c957a7eead3117416.png",
                    Nom: "Dérouleur/réenrouleur PDE 120+",
                    Desc: "Le PDE 120+ est le petit frère du DREEL 120+, Il permet d’avoir un dérouleur-enrouleur de faible encombrement à l’image du PREEL 120+ et ayant le même principe de fonctionnement.",
                    Alimentation: "230 V-Mono/50hz",
                    Poids: "4 kg",
                    Encombrement: "(L x l x h) : 289 x 218 x 230mm",
                    Moteur: "courant continu 24V",
                    Vitesse: "218 mm/s en Ø40",
                    Rouleaux: "Ø 200 mm maxi",
                    Etiquettes: "jusqu'à 120 mm (mandrin Ø 40)",
                    Options: "-Adaptateur 40-76"
                },
            ],
            distributrices: [{
                    Image: "eb3367_dde507590f6f42b89318f8dafe11eb87_mv2.jpg",
                    Nom: "Distributrice L50",
                    Desc: "La distributrice L50, présente en permanence une étiquette pré-décollée. Détection par cellule photo-électrique et gestion par relai, elle fonctionne avec tous types de mandrins.",
                    Alimentation: "230 V-Mono/50hz",
                    Poids: "4 kg",
                    Encombrement: "(L x l x h) : 300 x 181 x 180mm",
                    Moteur: "courant continu 24V ",
                    Detection: "par cellule photo-électrique",
                    Gestion: "par relai sur embase",
                    Vitesse: "98 mm/s en Ø40",
                    Rouleaux: "Ø 250 mm maxi",
                    Etiquettes: "laize de 5 à 50 mm",
                    Options: "-Brosse de tension étiquettes.\n-Détection par fibre optique.\n-Support cellule longue 60mm.\n-Rallonge pour bobine > Ø250mm.\n-Adaptateurs mandrin 20-40 et 20-76."
                },
                {
                    Image: "eb3367_dde507590f6f42b89318f8dafe11eb87_mv2.jpg",
                    Nom: "Distributrice L50+",
                    Desc: "La distributrice L50+, évolution de la L50 avec une motorisation plus rapide, présente en permanence une étiquette pré-décollée. Détection par cellule photo-électrique et gestion par relai, elle fonctionne avec tous types de mandrins.",
                    Alimentation: "230 V-Mono/50hz",
                    Poids: "4 kg",
                    Encombrement: "(L x l x h) : 300 x 181 x 180mm",
                    Moteur: "courant continu 24V ",
                    Detection: "par cellule photo-électrique",
                    Gestion: "par relai sur embase",
                    Vitesse: "218 mm/s en Ø40",
                    Rouleaux: "Ø 250 mm maxi",
                    Etiquettes: "laize de 5 à 50 mm",
                    Options: "-Brosse de tension étiquettes.\n-Détection par fibre optique.\n-Support cellule longue 60mm.\n-Rallonge pour bobine > Ø250mm.\n-Adaptateurs mandrin 20-40 et 20-76."
                },
                {
                    Image: "eb3367_625d8302a209491c9f408640add725a1.jpg",
                    Nom: "Distributrice L110",
                    Desc: "Présente en permanence une étiquette pré-décollée.Détection par cellule photo-électrique, gestion par relai.La L110 fonctionne avec tous types de mandrins.",
                    Alimentation: "230 V-Mono/50hz",
                    Poids: "4 kg",
                    Encombrement: "(L x l x h) : 300 x 241 x 180mm",
                    Moteur: "courant continu 24V ",
                    Detection: "par cellule photo-électrique",
                    Gestion: "par relai sur embase",
                    Vitesse: "98 mm/s en Ø40",
                    Rouleaux: "Ø 250 mm maxi",
                    Etiquettes: "laize de 5 à 110 mm",
                    Options: "-Brosse de tension étiquettes.\n-Détection par fibre optique.\n-Support cellule longue 60mm.\n-Rallonge pour bobine > Ø250mm.\n-Adaptateurs mandrin 20-40 et 20-76."
                },
                {
                    Image: "eb3367_625d8302a209491c9f408640add725a1.jpg",
                    Nom: "Distributrice L110 +",
                    Desc: "La distributrice L110+, évolution de la L110 avec une motorisation plus rapide, présente en permanence une étiquette pré-décollée. Détection par cellule photo-électrique et gestion par relai, elle fonctionne avec tous types de mandrins.",
                    Alimentation: "230 V-Mono/50hz",
                    Poids: "4 kg",
                    Encombrement: "(L x l x h) : 300 x 241 x 180mm",
                    Moteur: "courant continu 24V ",
                    Detection: "par cellule photo-électrique",
                    Gestion: "par relai sur embase",
                    Vitesse: "218 mm/s en Ø40",
                    Rouleaux: "Ø 250 mm maxi",
                    Etiquettes: "laize de 5 à 110 mm",
                    Options: "-Brosse de tension étiquettes.\n-Détection par fibre optique.\n-Support cellule longue 60mm.\n-Rallonge pour bobine > Ø250mm.\n-Adaptateurs mandrin 20-40 et 20-76."
                },
                {
                    Image: "c4962a_c76450251bf842f3a950da1.png",
                    Nom: "Distributrice L180",
                    Desc: "Présente en permanence une étiquette pré-décollée. Détection par cellule photo-électrique, gestion par relais sur embase. L'association de sa motorisation et de sa conception robuste lui permet de très grandes performances.",
                    Alimentation: "230 V-Mono/50hz",
                    Poids: "8 kg",
                    Encombrement: "(L x l x h) : 510 x 341 x 330mm",
                    Moteur: "courant continu 24V ",
                    Detection: "par cellule photo-électrique",
                    Gestion: "par relai sur embase",
                    Vitesse: "98 mm/s en Ø40",
                    Rouleaux: "Ø 300 mm maxi",
                    Etiquettes: "laize de 4 à 180 mm",
                    Options: "-Brosse de tension étiquettes.\n-Détection par fibre optique.\n-Support cellule longue 60mm.\n-Adaptateurs mandrin 40-76."
                },
                {
                    Image: "c4962a_c76450251bf842f3a950da1.png",
                    Nom: "Distributrice L180+",
                    Desc: "Présente en permanence une étiquette pré-décollée. Détection par cellule photo-électrique, gestion par relais sur embase. L'association de sa motorisation et de sa conception robuste lui permet de très grandes performances.",
                    Alimentation: "230 V-Mono/50hz",
                    Poids: "8 kg",
                    Encombrement: "(L x l x h) : 510 x 341 x 330mm",
                    Moteur: "courant continu 24V ",
                    Detection: "par cellule photo-électrique",
                    Gestion: "par relai sur embase",
                    Vitesse: "98 mm/s en Ø40", // TODO PEUT ETRE PAS BON
                    Rouleaux: "Ø 300 mm maxi",
                    Etiquettes: "laize de 4 à 180 mm",
                    Options: "-Brosse de tension étiquettes.\n-Détection par fibre optique.\n-Support cellule longue 60mm.\n-Adaptateurs mandrin 40-76."
                },
                {
                    Image: "eb3367_6238fbd3fee14677a7c2df9b19220eb6.png",
                    Nom: "Distributrice L220",
                    Desc: "Présente en permanence une étiquette pré-décollée. Détection par cellule photo-électrique, gestion par relais sur embase. L'association de sa motorisation et de sa conception robuste lui permet de très grandes performances.",
                    Alimentation: "230 V-Mono/50hz",
                    Poids: "8 kg",
                    Encombrement: "(L x l x h) : 510 x 381 x 330mm",
                    Moteur: "courant continu 24V ",
                    Detection: "par cellule photo-électrique",
                    Gestion: "par relai sur embase",
                    Vitesse: "98 mm/s en Ø40",
                    Rouleaux: "Ø 300 mm maxi",
                    Etiquettes: "laize de 4 à 220 mm",
                    Options: "-Brosse de tension étiquettes.\n-Détection par fibre optique.\n-Support cellule longue 60mm.\n-Adaptateurs mandrin 40-76."
                },
                {
                    Image: "eb3367_6238fbd3fee14677a7c2df9b19220eb6.png",
                    Nom: "Distributrice L220+",
                    Desc: "Evolution de la L220 avec une motorisation plus rapide.Présente en permanence une étiquette pré-décollée. Détection par cellule photo-électrique, gestion par relais sur embase. L'association de sa motorisation et de sa conception robuste lui permet de très grandes performances.",
                    Alimentation: "230 V-Mono/50hz",
                    Poids: "8 kg",
                    Encombrement: "(L x l x h) : 510 x 381 x 330mm",
                    Moteur: "courant continu 24V ",
                    Detection: "par cellule photo-électrique",
                    Gestion: "par relai sur embase",
                    Vitesse: "218 mm/s en Ø40",
                    Rouleaux: "Ø 300 mm maxi",
                    Etiquettes: "laize de 4 à 220 mm",
                    Options: "-Brosse de tension étiquettes.\n-Détection par fibre optique.\n-Support cellule longue 60mm.\n-Adaptateurs mandrin 40-76."
                },
                {
                    Image: "3e1747a9-6406-4206-ba43-ae6b5c4fd9ce.png",
                    Nom: "Dévidoir DVM 50/100/200",
                    Desc: "Version manuelle de nos distributrices électriques d'étiquettes.Possibilité de fixation murale.",
                    Alimentation: "Aucune",
                    Poids: "1 kg",
                    Encombrement: "(L x l x h) : 260 x58/113/223 x 130mm",
                    Moteur: "Aucun",
                    Detection: "Aucune",
                    Gestion: "Aucune",
                    Vitesse: "Manuelle",
                    Rouleaux: "Ø 200 mm maxi",
                    Etiquettes: "jusqu'à 200 mm",
                    Options: ""
                },
                {
                    Image: "9d184d8f-c772-4675-b1d5-84e6b60c12b6.png",
                    Nom: "Dévidoir DVMC 50",
                    Desc: "Basé sur le DVM50 standard, le Dévidoir Manuel Ceinture a été conçu plus léger afin de le transporter à la ceinture avec  une bobine de Ø150 et 50mm maximum de laize.",
                    Alimentation: "Aucune",
                    Poids: "200g",
                    Encombrement: "(L x l x h) : 260x58x130mm",
                    Moteur: "Aucun",
                    Detection: "Aucune",
                    Gestion: "Aucune",
                    Vitesse: "Manuelle",
                    Rouleaux: "Ø 150 mm maxi",
                    Etiquettes: "50 mm maximum",
                    Options: ""
                },
                {
                    Image: "ea96bd39-a8d3-47eb-98d2-c0fecaa1052f.png",
                    Nom: "Dévidoir DVMI 50/100/200",
                    Desc: "Version Inox des dévidoirs manuels, celle-ci est adaptée pour une utilisation dans le secteur de l'agro-alimentaire ou tout autre environnement nécessitant de l'inox.",
                    Alimentation: "Aucune",
                    Poids: "1 kg",
                    Encombrement: "(L x l x h) : 260 x58/113/223 x 130mm",
                    Moteur: "Aucun",
                    Detection: "Aucune",
                    Gestion: "Aucune",
                    Vitesse: "Manuelle",
                    Rouleaux: "Ø 200 mm maxi",
                    Etiquettes: "jusqu'à 200 mm",
                    Options: ""
                },
            ]
        }
    },
    mounted: function() {
        let path = this.$route.path
        let hash = this.$route.hash
        let self = this
        if (hash) {
            setTimeout(function() {
                self.Scroll(hash.substring(1))
                history.replaceState(null, null, ' ');
            }, 300);
        }
    },
    methods: {
        Scroll(to) {
            let el = this.$refs[to]
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        },
        VoirDistributrice(id) {
            this.id = id
            this.modal = !this.modal
        },
        VoirDerouleur(id) {
            this.Did = id
            this.Dmodal = !this.Dmodal
        },
        Open(url) {
            window.open(url)
        }
    },
    template: `
    <div>
        <section class="hero is-medium is-ccmpi is-bold">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                      CCMPI
                    </h1>
                    <h2 class="subtitle">
                        CONCEPTION ET COMMERCIALISATION DE MACHINES ET DE PRODUITS INDUSTRIELS
                    </h2>
                </div>
            </div>
        </section>
        

        <div class="container mt-6" ref="presentation">
            <div class="container is-fluid">
                <div class="columns box is-vcentered is-ccmpi">
                    <div class="column is-three-fifths">
                        <div>
                            <div class="content is-medium">
                                <h1>Solutions​ pour l'industrie</h1>
                                <p>Nos prestations globales répondent à vos besoins en études, réalisation de machines spéciales et solutions pour l'étiquetage. 15 ans de savoir-faire et de technique pour vous apporter LA solution.</p>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <figure class="image is-square">
                            <img src="/images/c4962a_6d6e48c048264edea9abc01ad38ec3c3.webp">
                        </figure>
                    </div>
                    <div class="column">
                        <figure class="image">
                            <img src="/images/eb3367_1ab0dfc0582f4c6792132d5e3469b71a_mv2_d_2592_4608_s_4_2.webp">
                        </figure>
                    </div>
                </div>

                <div class="columns mt-6">
                    <div class="column is-one-third">
                        <div class="box pointer marbtm mx-2" @click="Scroll('bureau')">
                            <figure class="image is-square ">
                                <img src="/images/eb3367_997e69edc6ed452c8cfeda0ff8a32c21_mv2_waifu2x_art_noise1_scale_tta_1final.jpg">
                            </figure>
                            <div class="content is-medium min400">
                                <h5 class="has-text-centered mt-4">Bureau d'études</h5>
                                <p>Nos bureaux d'études techniques vous proposent ses compétences dans différents secteurs industriels : recherche, radio-téléphonie, connectique automobile,</p>
                            </div>
                        </div>
                    </div>
                    <div class="column is-one-third">
                        <div class="box pointer marbtm mx-2" @click="Scroll('presentation')">
                            <figure class="image is-square">
                                <img src="/images/speciale.jpg">
                            </figure>
                            <div class="content is-medium min400">
                                <h5 class="has-text-centered mt-4">Machines spéciales</h5>
                                <p>Conception, mise en plans et réalisation de machines de production automatisée. Modélisation de système de motorisation et d’indexage, outillage réalisé sur cahier des charges,  Banc de test  autonome pour câblage de  petits faisceaux automobile. Programmation automate, câblage électrique et pneumatique.</p>
                            </div>
                        </div>
                    </div>
                    <div class="column is-one-third">
                        <div class="box pointer marbtm mx-2" @click="Scroll('etiquetage')">
                            <figure class="image is-square ">
                                <img src="/images/etique.jpg">
                            </figure>
                            <div class="content is-medium min400">
                                <h5 class="has-text-centered mt-4">Étiquetage</h5>
                                <p>Leader dans la réalisation de machine d'étiquetage, CCMPi propose toute une gamme de matériel. Distribuer - Poser en statique ou en dynamique - Dérouler ou Réenrouler des bobines d'étiquettes - En standard ou en spécial.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <section class="hero is-ccmpi mt-6" ref="bureau">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        BUREAU D'ÉTUDES
                    </h1>
                    <h2 class="subtitle">
                        Vous avez l'idée, nous l'étudions.
                        Notre équipe peut étudier et réaliser différents types de demandes, selon cahier des charges, plan, ou pièce prototype.
                    </h2>
                </div>
            </div>
        </section>

        <div class="container mt-6">
            <div class="container is-fluid">
                <template>
                    <b-carousel :indicator-inside="false">
                        <b-carousel-item v-for="(v, i) in carousel" :key="i">
                            <span class=" limt" :draggable="true">
                              <img class="cover centerimg" :draggable="true" :src="'/images/' + v">
                            </span>
                        </b-carousel-item>
                        <template slot="indicators" slot-scope="props">
                            <span class="al image cover">
                                <img :src="'/images/' + carousel[props.i]" :title="carousel[props.i]">
                            </span>
                        </template>
                    </b-carousel>
                </template>

                <div class="content is-medium mt-6">
                    <h3>Nos domaines d'intervention</h3>
                    <p>Nous travaillons sur l'étude, la conception et la réalisation de prototypes et de séries à partir de logiciels dédiés: SolidWorks , pack office.</p>
                    <p>CCMPI travaille avec différents secteurs d'activité tels que:</p>

                    <ul>
                        <li>Automobiles</li>
                        <li>Etiquetage</li>
                        <li>Energies renouvelables</li>
                        <li>Armement/defense</li>
                        <li>Equipement de laboratoire</li>
                    </ul>
                </div>
                <hr>
                <div class="content is-medium mt-6">
                    <h3>Notre savoir-faire</h3>
                    <p>Nous détenons notamment un savoir-faire dans ces domaines :</p>
                    <ul>
                        <li>Conception de systèmes mécaniques </li>
                        <li>Pré-étude avec proposition de solutions innovantes </li>
                        <li>Réponses étoffées et détaillées  à des cahiers des charges</li>
                        <li>Montage de mécanisme intégrant des mouvements complexes</li>
                        <li>Intégration du matériel sur site </li>
                        <li>Gestion de projet (analyse de risques, suivi de fabrication, planification, etc) </li>
                    </ul>
                </div>
                <hr>
                <div class="content is-medium mt-6">
                    <h3>Nos prestations</h3>
                    <p>CCMPI propose plusieurs formes de prestations à savoir:</p>
                    <ul>
                        <li>Etude de faisabilité </li>
                        <li>Conception et réalisation de machines spéciales </li>
                        <li>Intégration et réglage sur site client </li>
                        <li>Réalisation de mise en plan </li>
                        <li>Suivi de fabrication </li>
                        <li>Réadaptation de postes de travail </li>
                    </ul>
                </div>
            </div>
        </div>

        <section class="hero is-ccmpi mt-6" ref="etiquetage">
            <div class="hero-body">
                <div class="container mt-4 mb-4">
                    <h1 class="title">
                    ÉTIQUETAGE
                    </h1>
                </div>
            </div>
        </section>

        <div class="container mt-6" ref="presentation">
            <div class="container is-fluid">

                <div class="columns mt-6">
                    <div class="column is-one-third">
                        <div class="box pointer is-ccmpi marbtm mx-2" @click="Scroll('distributrices')">
                            <figure class="image is-square ">
                                <img src="/images/c4962a_c76450251bf842f3a950da1.png">
                            </figure>
                            <div class="content is-medium min600">
                                <h5 class="has-text-centered mt-4">Gamme distributrices</h5>
                                <p>Nos distributrices automatiques présentent une à une les étiquettes adhésives conditionnées en rouleau. Via une cellule de détection et un système automatisé, les étiquettes arrivent décolées de leur support siliconé et sont prêtes à être apposées.</p>
                                <p>Nos modèles existent dans différentes lèzes et s'adaptent à la plupart des bobines d'étiquettes.</p>
                            </div>
                        </div>
                    </div>
                    <div class="column is-one-third">
                        <div class="box pointer is-ccmpi marbtm mx-2" @click="Scroll('derouleurs')">
                            <figure class="image is-square">
                                <img src="/images/46e81a18-0d2d-4a94-9fe3-798e7b.png">
                            </figure>
                            <div class="content is-medium min600">
                                <h5 class="has-text-centered mt-4">Gamme Dérouleurs / Réenrouleurs</h5>
                                <p>Nos solutions de dérouleurs/réenrouleurs réalisent des rouleaux d'étiquettes de manière automatisée. Le bras de tension assure la gestion du brin mou de façon autonome.</p>
                                <p>Placé en amont de votre imprimante, le dérouleur augmente la capacité de votre ligne d'impression.</p>
                                <p>Nos modèles de ré-enrouleurs d'étiquettes s'adaptent facilement à tous vos modèles d'imprimantes.</p>
                            </div>
                        </div>
                    </div>
                    <div class="column is-one-third">
                        <div class="box pointer is-ccmpi marbtm mx-2" @click="Scroll('etiquetage')">
                            <figure class="image is-square ">
                                <img src="/images/eb3367_af0477e1f81d4c2ebfcecbf1800a2e31_mv2_waifu2x_photo_noise3_scale_tta_1.png">
                            </figure>
                            <div class="content is-medium min600">
                                <h5 class="has-text-centered mt-4">Fabrication spéciale</h5>
                                <p>Que ce soit une combinaison de plusieurs de nos machines ou une adaptation spéciale sur un modèle, CCMPI est en mesure de vous proposer une solution technique répondant à votre besoin.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section class="hero is-ccmpi mt-6" ref="distributrices">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                    Nos distributrices d'étiquette
                    </h1>
                    <h2 class="subtitle">
                    Découvrez notre gamme de solutions dédiées à l'étiquetage: depuis l'étude jusqu'à la livraison dans vos locaux, nous fabriquons des machines spéciales pour l'étiquetage.
                    Nos solutions vous apportent un gain en productivité pour vos chaines de production et vos lignes d'emballage.
                    </h2>
                </div>
            </div>
        </section>

        <div class="container mt-6">
            <div class="container is-fluid">
                <div v-for="i in (distributrices.length + 1)">
                    <div class="columns" v-if="i%2==0">
                        <div class="column is-one-quarter mt-6" v-if="!distributrices[i-1]"></div>
                        <div class="column is-half mt-6" v-if="distributrices[i-2]">
                            <div class="columns box pointer is-ccmpi is-vcentered shaar mx-4" @click="VoirDistributrice(i-2)">
                                <div class="column is-primary ccmpi-productimg">
                                    <figure class="image ccmpi-productimg">
                                        <img :src="'/images/' + distributrices[i-2].Image">
                                    </figure>
                                </div>
                                <div class="column">
                                    <div class="content is-medium mobile-center">
                                        <div class="bold">{{distributrices[i-2].Nom}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column is-half mt-6" v-if="distributrices[i-1]">
                            <div class="columns box pointer is-ccmpi is-vcentered shaar mx-4" @click="VoirDistributrice(i-1)">
                                <div class="column is-primary ccmpi-productimg">
                                    <figure class="image ccmpi-productimg">
                                        <img :src="'/images/' + distributrices[i-1].Image">
                                    </figure>
                                </div>
                                <div class="column">
                                    <div class="content is-medium mobile-center">
                                        <div class="bold">{{distributrices[i-1].Nom}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <b-modal v-model="modal" @close="modal=false" width="1024px">
            <div style="width: 100%">
                <section class="modal-card-body">
                    <div class="mx-4 my-4">
                        <h1 class="title has-text-centered"> {{distributrices[id].Nom}} </h1>
                        <h3 class="subtitle mt-4 mb-4"> {{distributrices[id].Desc}} </h3>
                        <div class="columns is-vcentered">
                            <div class="column is-half">
                                <figure class="image">
                                    <img :src="'/images/' + distributrices[id].Image">
                                </figure>
                            </div>
                            <div class="column">
                                <div class="box">
                                    <h5 class="subtitle is-5 mt-3"> Caractéristiques générales: </h5>
                                    <div> Alimentation: {{distributrices[id].Alimentation}} </div>
                                    <div> Poids: {{distributrices[id].Poids}} </div>
                                    <div> Encombrement: {{distributrices[id].Encombrement}} </div>
                                    <h5 class="subtitle is-5 mt-3"> Caractéristiques techniques: </h5>
                                    <div> Moteur: {{distributrices[id].Moteur}} </div>
                                    <div> Détection étiquette: {{distributrices[id].Detection}} </div>
                                    <div> Gestion: {{distributrices[id].Gestion}} </div>
                                    <div> Vitesse moyenne de distribution: {{distributrices[id].Vitesse}} </div>
                                    <h5 class="subtitle is-5 mt-3"> Caractéristiques produit: </h5>
                                    <div> Rouleaux Étiquettes: {{distributrices[id].Rouleaux}} </div>
                                    <div> Étiquettes : {{distributrices[id].Etiquettes}} </div>
                                    <h5 class="subtitle is-5 mt-3" v-if="distributrices[id].Options.split('\\n')[0]">  Options : </h5>
                                    <ul>
                                        <li v-for="v in distributrices[id].Options.split('\\n')">
                                          {{ v }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </b-modal>

        <section class="hero is-ccmpi mt-6" ref="derouleurs">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                    Nos dérouleurs / réenrouleurs d'étiquette
                    </h1>
                    <h2 class="subtitle">
                    Notre gamme de dérouleurs/réenrouleurs électriques vous apportent un gain de temps dans le conditionnement de vos rouleaux d'étiquettes et son de faible encombrement. Vous trouverez différentes options de laize, d'ergonomie de transport, de capacité et de fonctionnalités.  
                    </h2>
                </div>
            </div>
        </section>

        <div class="container mt-6">
            <div class="container is-fluid">
                <div v-for="i in (derouleur.length + 1)">
                    <div class="columns" v-if="i%2==0">
                        <div class="column is-one-quarter mt-6" v-if="!derouleur[i-1]"></div>
                        <div class="column is-half mt-6" v-if="derouleur[i-2]">
                            <div class="columns box pointer is-ccmpi is-vcentered shaar mx-4" @click="VoirDerouleur(i-2)">
                                <div class="column is-primary ccmpi-productimg">
                                    <figure class="image ccmpi-productimg">
                                        <img :src="'/images/' + derouleur[i-2].Image">
                                    </figure>
                                </div>
                                <div class="column">
                                    <div class="content is-medium mobile-center">
                                        <div class="bold">{{derouleur[i-2].Nom}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column is-half mt-6" v-if="derouleur[i-1]">
                            <div class="columns box pointer is-ccmpi is-vcentered shaar mx-4" @click="VoirDerouleur(i-1)">
                                <div class="column is-primary ccmpi-productimg">
                                    <figure class="image ccmpi-productimg">
                                        <img :src="'/images/' + derouleur[i-1].Image">
                                    </figure>
                                </div>
                                <div class="column">
                                    <div class="content is-medium mobile-center">
                                        <div class="bold">{{derouleur[i-1].Nom}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <b-modal v-model="Dmodal" @close="modal=false" width="1024px">
            <div style="width: 100%">
                <section class="modal-card-body">
                    <div class="mx-4 my-4">
                        <h1 class="title has-text-centered"> {{derouleur[Did].Nom}} </h1>
                        <h3 class="subtitle mt-4 mb-4"> {{derouleur[Did].Desc}} </h3>
                        <div class="columns is-vcentered">
                            <div class="column is-half">
                                <figure class="image">
                                    <img :src="'/images/' + derouleur[Did].Image">
                                </figure>
                            </div>
                            <div class="column">
                                <div class="box">
                                    <h5 class="subtitle is-5 mt-3"> Caractéristiques générales: </h5>
                                    <div> Alimentation: {{derouleur[Did].Alimentation}} </div>
                                    <div> Poids: {{derouleur[Did].Poids}} </div>
                                    <div> Encombrement: {{derouleur[Did].Encombrement}} </div>
                                    <h5 class="subtitle is-5 mt-3"> Caractéristiques techniques: </h5>
                                    <div> Moteur: {{derouleur[Did].Moteur}} </div>
                                    <div> Vitesse moyenne de distribution: {{derouleur[Did].Vitesse}} </div>
                                    <h5 class="subtitle is-5 mt-3"> Caractéristiques produit: </h5>
                                    <div> Rouleaux Étiquettes: {{derouleur[Did].Rouleaux}} </div>
                                    <div> Étiquettes : {{derouleur[Did].Etiquettes}} </div>
                                    <h5 class="subtitle is-5 mt-3" v-if="derouleur[Did].Options.split('\\n')[0]">  Options : </h5>
                                    <ul>
                                        <li v-for="v in derouleur[Did].Options.split('\\n')">
                                          {{ v }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </b-modal>

        <section class="hero is-ccmpi mt-6" ref="tarifs">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                    TARIFS REVENDEURS
                    </h1>
                    <h2 class="subtitle">
                    Vous trouverez ci-dessous un lien vers les tarifs mis à jour de nos produits
                    </h2>
                </div>
            </div>
        </section>

        <div class="container mt-6 mb-6">
            <div class="container is-fluid">
                <div class="columns">
                    <div class="column is-one-third"></div>
                    <div class="column is-one-third">
                        <button class="button is-ccmpi is-large" style="width : 100%;" @click="Open('/download/tarifs.pdf')">
                            <span class="icon is-medium">
                              <i class="fa fa-download"></i>
                            </span>
                            <span>TARIFS REVENDEURS</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <section class="hero is-ccmpi mt-6" ref="apropos">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                    À PROPOS
                    </h1>
                </div>
            </div>
        </section>

        <div class="container mt-6 mb-6">
            <div class="container is-fluid">
                <div class="content is-medium">
                    <h1>SARL CCMPI: le savoir-faire au service de l'industrie.</h1>
                    <p>Crée en 1998, la société CCMPI vous propose son savoir-faire en ingénierie et études techniques pour la réalisation de machines spéciales et de produits dédiés à l'industrie dans divers domaines.</p>
                    <p>Afin de proposer des solutions globales, la société travaille depuis plus de 15 ans en étroite collaboration avec la société BETTEGA & Fils, partenaire de la réalisation des pièces mécaniques.</p>
                    <p>CCMPI, c'est aussi le développement d'une gamme dédiée à l'étiquetage avec des solutions de machines compactes et automatisées pour la pose d'étiquettes, le rembobinage de rouleaux d'étiquettes, et de solutions connexes, étudiées pour votre process industriel. Sa gamme répond aux exigences des directives ROHS.</p>
                </div>
             </div>
        </div>

        <section class="hero is-ccmpi mt-6" ref="clients">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                    NOS CLIENTS
                    </h1>
                </div>
            </div>
        </section>

        <div class="container mt-6 mb-6">
            <div class="container is-fluid">
                <div class="columns is-vcentered">
                    <div class="column is-one-third">
                        <figure class="image">
                            <img src="/images/logo-irap-couleur.png">
                        </figure>
                    </div>
                    <div class="column is-one-third">
                        <figure class="image">
                            <img src="/images/logo-actia.png">
                        </figure>
                    </div>
                    <div class="column is-one-third">
                        <figure class="image">
                            <img src="/images/continental.png">
                        </figure>
                    </div>
                </div>
                <div class="columns is-vcentered">
                    <div class="column is-one-third">
                        <figure class="image">
                            <img src="/images/back-safran-electrical-power.jpg">
                        </figure>
                    </div>
                    <div class="column is-one-third">
                        <figure class="image">
                            <img src="/images/1200px-Centre_national_de_la_recherche_scientifique.svg.png">
                        </figure>
                    </div>
                    <div class="column is-one-third">
                        <figure class="image">
                            <img src="/images/2493px-LACROIX_Electronics_logo.svg.png">
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
}

const bettega = {
    mounted: function() {
        let path = this.$route.path
        let hash = this.$route.hash
        let self = this
        if (hash) {
            setTimeout(function() {
                self.Scroll(hash.substring(1))
                history.replaceState(null, null, ' ');
            }, 300);
        }
    },
    methods: {
        Scroll(to) {
            let el = this.$refs[to]
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        },
    },
    data() {
        return {
            carousels: [
                ["c4962a_880737bca30a4ea38d9820960aa53a8c.webp", "c4962a_2c372a882527462f9af61f7a731935d3.webp", "c4962a_ff0ca6f577dd4190a0834a87d4528398.webp", "c4962a_4674a61d61004440ba78f6e68e5da4d7.webp", "c4962a_e9b7de3d79984cb0920adbf793b4d571.webp"],
                ["c4962a_524f4128e9a24b64a7dcd59baf02cb21.webp", "c4962a_40ca30afec51454283638dc2a2c5858f.webp", "c4962a_b6cb1a65480f47e499f3aecc305a8b54.webp", "c4962a_5c435206e6a143dd861a904134016342.webp", "c4962a_4462052bc33043828248cce22e66cbab.webp"],
                ["c4962a_28ffb5a6103d4e71809e2d0c1c1ec12f.webp", "c4962a_47a6404df5634477b3726a0e1819e820.webp", "c4962a_47d06cdcd27e40cfa22753065e7ce310.webp", "c4962a_8d5314fa4d674363b6927b7785d5c5b8.webp", "c4962a_6f5c435c12f047fb8a631b727f1b8e75.webp", "c4962a_067588a7d8084fc1a3a62be8ade4a24c.webp"]
            ]
        }
    },
    template: `
	<div>
        <section class="hero is-medium is-bettega is-bold">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                      BETTEGA-ET-FILS
                    </h1>
                    <h2 class="subtitle">
                        MÉCANIQUE DE PRÉCISION
                    </h2>
                    <h2 class="subtitle">
                    Basée à Colomiers, proche de Toulouse, l'entreprise BETTEGA & Fils dispose de compétences qualifiées pour répondre à vos besoins en usinage (fraisage et tournage en conventionnel et à commande numérique), conception et réalisation de machines spéciales. Avec une expérience de plus de 40 ans dans le métier, notre savoir-faire et nos équipements nous permettent de vous proposer une gamme complète de services dans le domaine de la mécanique de précision.
                    </h2>
                </div>
            </div>
        </section>

        <div class="container mt-6">
            <div class="container is-fluid">

                <div class="content is-medium">
                    <div class="subtitle is-3"><strong>40 ans</strong> de savoir-faire</div>
                    <p>Implanté dans la région de Toulouse depuis 1971, en Haute Garonne, Bettega & Fils vous propose une prestation globale dans les domaines suivants :</p>
                    <ul>
                        <li>étude et conception.</li>
                        <li>réalisation de pièces et d'outillages mécaniques.</li>
                        <li>contrôle de pièces.</li>
                        <li>montage d'équipement.</li>
                        <li>conception, réalisation, mise au point et installation sur site de machines spéciales.</li>
                        <li>formation (contrat d'apprentissage, contrat de professionnalisation).</li>
                    </ul>
                    <p>17 personnes qualifiées, certaines polyvalentes et d'autres vraiment spécialisées dans leur domaine d'intervention, répondent  à vos besoins. </p>
                    <p>Bettega & Fils livre majoritairement en Midi-Pyrénées et expédie également vos commandes par transporteur en France et à l'étranger.</p>
                </div>

                <div class="mt-6">
                    <div class="container-iframe">
                        <iframe class="responsive-iframe" src="https://www.youtube.com/embed/orrkwDRLXVg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>

                <div class="columns mt-6">
                    <div class="column is-one-quarter">
                        <figure class="image mt-2">
                            <img src="/images/c4962a_7f2238ba43a84c6ba61b26852cf8d4c3.webp">
                        </figure>
                    </div>
                    <div class="column is-three-quarter mt-2">
                        <div class="content is-medium">
                            <h3>CONCEPTION</h3>
                            <p>Bureau d'étude pour la conception de pièces mécaniques, de postes de travail et de machines spéciales.</p>
                        </div>
                    </div>
                </div>

                <div class="columns">
                    <div class="column is-one-quarter">
                        <figure class="image mt-2">
                            <img src="/images/c4962a_40ca30afec51454283638dc2a2c5858f.webp">
                        </figure>
                    </div>
                    <div class="column is-three-quarter mt-2">
                        <div class="content is-medium">
                            <h3>USINAGE</h3>
                            <p>Réalisation de pièces et d'outillages mécaniques du prototype, à la petite et moyenne série. Usinage de pièces (dimension : entre 1 mm et plus de 2 000 mm) selon différents procédés : fraisage, tournage. Travail sur tout type de matières : Acier, Carbure, Aluminium, Inox, Titane, Inconel, Matières Plastiques, Composites, Céramiques, etc.</p>
                        </div>
                    </div>
                </div>

                <div class="columns">
                    <div class="column is-one-quarter">
                        <figure class="image mt-2">
                            <img src="https://via.placeholder.com/300x160">
                        </figure>
                    </div>
                    <div class="column is-three-quarter mt-2">
                        <div class="content is-medium">
                            <h3>MONTAGE</h3>
                            <p>La société assure l'activité d'assemblage, de montage et d'intégration sur site pour la réalisation de machines spéciales selon le cahier des charges et les besoins de ses clients. Elle dispose de compétences dans les domaines suivants: assemblage spécifique, automatisme, électricité, électronique, mécanique, pneumatique, usinage, tôlerie-serrurerie, vision (contrôle par caméra), supervision (informatique industrielle)</p>
                        </div>
                    </div>
                </div>

                <div class="columns">
                    <div class="column is-one-quarter">
                        <figure class="image mt-2">
                            <img src="https://via.placeholder.com/300x160">
                        </figure>
                    </div>
                    <div class="column is-three-quarter mt-2">
                        <div class="content is-medium">
                            <h3>CONTROLE QUALITE</h3>
                            <p>Le contrôle est une activité très importante dans la société. Il est réalisé soit entre les différentes phases de production soit en continu. Grâce à sa machine à mesurer tridimensionnelle (2000 x 1000), il est possible de proposer des prestations de contrôle sur des pièces de dimensions importantes. L'entreprise est certifié ISO 9001 depuis 2015 et vise la certification EN9100 début 2019.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section class="hero is-bettega mt-6" ref="activite">
            <div class="hero-body">
                <div class="container mt-4 mb-4">
                    <h1 class="title">
                    DOMAINES D'ACTIVITE
                    </h1>
                </div>
            </div>
        </section>

        <div class="container mt-6">
            <div class="container is-fluid">
                <div class="columns">
                    <div class="column is-three-fifths mt-2">
                        <div class="content is-medium">
                            <h3>AERONAUTIQUE</h3>
                            <p>Sous-traitant historique dans le secteur aéronautique, la société intervient sur la conception et la réalisation d'outillages et de pièces.</p>
                        </div>
                    </div>
                    <div class="column is-two-fifths">
                        <figure class="image mt-2">
                            <img src="/images/c4962a_e9b7de3d79984cb0920adbf793b4d571.webp">
                        </figure>
                    </div>
                </div>
                <hr>
                <div class="columns">
                    <div class="column is-three-fifths mt-2">
                        <div class="content is-medium">
                            <h3>SPATIAL</h3>
                            <p>Usinage de pièces complexes. Travail de précision réalisé par des opérateurs de haut niveau avec une longue expérience.</p>
                        </div>
                    </div>
                    <div class="column is-two-fifths">
                        <figure class="image mt-2">
                            <img src="/images/c4962a_880737bca30a4ea38d9820960aa53a8c.webp">
                        </figure>
                    </div>
                </div>
                <hr>
                <div class="columns">
                    <div class="column is-three-fifths mt-2">
                        <div class="content is-medium">
                            <h3>ELECTRONIQUE</h3>
                            <p>
                            Usinage de pièces en alliage d'aluminium ou en matière plastique en petite et moyenne série.</p>
                        </div>
                    </div>
                    <div class="column is-two-fifths">
                        <figure class="image mt-2">
                            <img src="/images/c4962a_2c372a882527462f9af61f7a731935d3.webp">
                        </figure>
                    </div>
                </div>
                <hr>
                <div class="columns">
                    <div class="column is-three-fifths mt-2">
                        <div class="content is-medium">
                            <h3>ELECTRONIQUE</h3>
                            <p>
                            Usinage de pièces en alliage d'aluminium ou en matière plastique en petite et moyenne série.</p>
                        </div>
                    </div>
                    <div class="column is-two-fifths">
                        <figure class="image mt-2">
                            <img src="/images/c4962a_6f5c435c12f047fb8a631b727f1b8e75.webp">
                        </figure>
                    </div>
                </div>
            </div>
        </div>

        <section class="hero is-bettega mt-6" ref="partenaires">
            <div class="hero-body">
                <div class="container mt-4 mb-4">
                    <h1 class="title">
                    PARTENAIRES
                    </h1>
                </div>
            </div>
        </section>

         <div class="container mt-6">
            <div class="container is-fluid">
                <div class="columns">
                    <div class="column is-one-fifths">
                        <figure class="image  mt-6 mb-6">
                            <img class="i-33p" src="/images/c4962a_9f8d006a349b456480b6d197f74f4330.gif">
                        </figure>
                    </div>
                    <div class="column is-four-fifths mt-6 mb-6">
                        <div class="content is-medium">
                            <h3>CCMPI</h3>
                            <p>Le bureau d'études, CCMPI, est implanté dans la bâtiment et propose ses compétences dans le domaine de l'étude et de la machine d'étiquetage.</p>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="columns">
                    <div class="column is-one-fifths">
                        <figure class="image  mt-6 mb-6">
                            <img class="i-33p" src="/images/ccilogo.png">
                        </figure>
                    </div>
                    <div class="column is-four-fifths mt-6 mb-6">
                        <div class="content is-medium">
                            <h3>CCI TOULOUSE</h3>
                            <p>Retrouvez les actualiatés et services de la vie économique et industrielle de Toulouse.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section class="hero is-bettega mt-6" ref="realisations">
            <div class="hero-body">
                <div class="container ">
                    <h1 class="title">
                        REALISATIONS
                    </h1>
                    <h2 class="subtitle">
                        Etude et réalisation de pièces et d'outillages mécaniques, de machines spéciales Gamme complète dans le domaine de l'étiquetage
                    </h2>
                </div>
            </div>
        </section>

        <div class="container mt-6">
            <div class="container is-fluid">
                <div class="columns is-vcentered">
                    <div class="column is-three-fifths">
                        <template>
                            <b-carousel>
                                <b-carousel-item v-for="(v, i) in carousels[0]" :key="i">
                                    <figure class="image is-16by9 mt-6 mb-6" :draggable="true">
                                        <img :src="'/images/' + v">
                                    </figure>
                                </b-carousel-item>
                            </b-carousel>
                        </template>
                    </div>
                    <div class="column">
                        <div class="content is-medium">
                            <h3>PIECES MECANIQUES</h3>
                            <p>Du prototype à la petite et moyenne série Travail sur tout type de matière : Aluminium, Acier, Inox, Titane, Inconel, Matières Plastiques, Composites, Céramiques. Spécialités: usinage mécanique, rectification plane, ajustage, assemblage d'ensembles et de sous-ensembles, mécano-soudure, moletage crantage, usinage de profilés, gravage, marquage, micro-mécanique, parachèvement, usinage de pièces de fonderie.</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>

        <div class="container mt-6">
            <div class="container is-fluid">
                <div class="columns is-vcentered">
                    <div class="column is-three-fifths">
                        <template>
                            <b-carousel>
                                <b-carousel-item v-for="(v, i) in carousels[1]" :key="i">
                                    <figure class="image is-16by9 mt-6 mb-6" :draggable="true">
                                        <img :src="'/images/' + v">
                                    </figure>
                                </b-carousel-item>
                            </b-carousel>
                        </template>
                    </div>
                    <div class="column">
                        <div class="content is-medium">
                            <h3>OUTILLAGES</h3>
                            <p>Etude, réalisation de pièces et d'outillages. Fabrication de moule, maquette, modèle, étalon. Réalisations d'outils de contrôle, de pliage, de découpe, de reprise, d'outillages spéciaux.</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>

        <div class="container mt-6">
            <div class="container is-fluid">
                <div class="columns is-vcentered">
                    <div class="column is-three-fifths">
                        <template>
                            <b-carousel>
                                <b-carousel-item v-for="(v, i) in carousels[2]" :key="i">
                                    <figure class="image is-16by9 mt-6 mb-6" :draggable="true">
                                        <img :src="'/images/' + v">
                                    </figure>
                                </b-carousel-item>
                            </b-carousel>
                        </template>
                    </div>
                    <div class="column">
                        <div class="content is-medium">
                            <h3>MACHINES SPECIALES</h3>
                            <p>Notre filiale CCMPI, propose à ses clients la conception, l'assemblage et l'installation sur site de machines spéciales. L'entreprise accompagne ses clients dans leurs projets et leur apporte des solutions sur mesure grâce à ses compétences en mécanique, pneumatique, électrique et automatisme. CCMPI a développé pour ses clients des postes de travail et des machines spéciales ainsi qu'une gamme de produits propres de machines à étiquetage semi-automatiques.</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>

        <section class="hero is-bettega mt-6" ref="parc">
            <div class="hero-body">
                <div class="container mt-4 mb-4">
                    <h1 class="title">
                    PARC MACHINE ET ÉQUIPEMENTS
                    </h1>
                </div>
            </div>
        </section>

        <div class="container">
            <div class="container is-fluid">
                <div class="box mt-6">
                    <h3 class="title is-4 has-text-centered">PARC CN</h3>
                    <div class="columns is-vcentered  ">

                        <div class="column is-one-fifths shaar">

                            <figure class="image is-full">
                                <img src="/images/c4962a_4dbc106a855a4ab6b33b2c9cb8f7ddce.webp">
                            </figure>
                        </div>
                        <div class="column is-four-fifths">
                            <div class="content is-medium ">

                                <ul>
                                    <li>1 centre d'usinage HURCO - CN 5 axes - 1067x610x610</li>
                                    <li>1 centre d'usinage HURCO - CN 3 axes - 2183x890x800</li>
                                    <li>1 centre d'usinage HURCO - CN 3 axes - 1067x610x610</li>
                                    <li>1 centre d'usinage MORI SEIKI - CN 4 axes - 850x480x460</li>
                                    <li>1 centre d'usinage MORI SEIKI palettisé - CN 3 axes - 500x500x480</li>
                                    <li>1 tour CN HURCO - diamètre 500 - EP 1000</li>
                                    <li>1 tour CN CMZ avec axe C - diamètre 150 - EP 400</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="box mt-6">
                    <h3 class="title is-4 has-text-centered">PARC CONVENTIONNEL</h3>
                    <div class="columns is-vcentered">

                        <div class="column is-one-fifths shaar">

                            <figure class="image is-full">
                                <img src="/images/c4962a_2a67ba90e74a403ea7ca2a3f37e33b95.webp">
                            </figure>
                        </div>
                        <div class="column is-four-fifths">
                            <div class="content is-medium">
                                <ul>
                                    <li>1 fraiseuse HURON - 850x700x500</li>
                                    <li>3 fraiseuses DUFOUR - 900x300x500</li>
                                    <li>1 tour CAZENEUVE HBX diamètre 350 EP 600</li>
                                    <li>1 tour RAMO diamètre 250 EP 400</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="box mt-6">
                    <h3 class="title is-4 has-text-centered">SALLE DE CONTRÔLE</h3>
                    <div class="columns is-vcentered">

                        <div class="column is-one-fifths shaar">

                            <figure class="image is-full">
                                <img src="/images/c4962a_183ee56e74f740e084aedd986b0f2fae.webp">
                            </figure>
                        </div>
                        <div class="column is-four-fifths">
                            <div class="content is-medium">
                                <ul>
                                    <li>Tridimensionnelle Zeiss par programmation ou par auto apprentissage - Capacité 2100x1000x800</li>
                                    <li>Tridimensionnelle 600x500x500</li>
                                    <li>Colonne de mesure TESA</li>
                                    <li>Marbre 1000x650</li>
                                    <li>Duromètre</li>
                                    <li>Contrôle de conductivité</li>
                                    <li>Binoculaire</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="box mt-6">
                    <h3 class="title is-4 has-text-centered">SALLE DE MONTAGE</h3>
                    <div class="columns is-vcentered">

                        <div class="column is-one-fifths shaar">

                            <figure class="image is-full">
                                <img src="/images/c4962a_2b0f605c77104befa0a8aaef08cbb397.webp">
                            </figure>
                        </div>
                        <div class="column is-four-fifths">
                            <div class="content is-medium">
                                <ul>
                                    <li>2 salles de montage dédiées de 40 m2</li>
                                    <li>1 salle de 200 m2 dédié au montage d'outillage et de machine spéciale</li>
                                    <li>1 zone d'ajustage équipée de: perceuse, taraudeuse, micro-taraudeuse, machien à graver par micro-percussion</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mb-6"></div>
            </div>
        </div>

    </div>
`
}

const vidalmp = {
    data: function() {
        return {
            isImageModalActive: false
        }
    },
    mounted: function() {
        let path = this.$route.path
        let hash = this.$route.hash
        let self = this
        if (hash) {
            setTimeout(function() {
                self.Scroll(hash.substring(1))
                history.replaceState(null, null, ' ');
            }, 300);
        }
    },
    watch: {
        $route(to, from) {

            let path = to.path
            let hash = to.hash
            let self = this
            if (hash) {
                self.Scroll(hash.substring(1))
                history.replaceState(null, null, ' ');
            }
        }

    },
    methods: {
        Scroll(to) {
            let el = this.$refs[to]
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        },
        FullScreenImg(event) {
            let target = event.target
            console.log(target.childNodes[1])
            const h = this.$createElement
            const vnode = h('p', { class: "my-6 image is-1by1" }, [
                h('img', { attrs: { src: target.src } })
            ])
            this.$buefy.modal.open({
                content: [vnode]
            })
        },
        Video(event) {
            let target = event.target
            const h = this.$createElement
            const vnode = h('p', { class: "my-6 image is-1by1" }, [
                h('img', { attrs: { src: target.src } })
            ])
            this.$buefy.modal.open({
                content: [vnode]
            })
        },
    },
    template: `
    <div>
        <section class="hero is-medium is-vidalmp is-bold">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                      VIDAL MP
                    </h1>
                    <h2 class="subtitle">
                    MÉCANIQUE DE PRÉCISION
                    </h2>
                    <h2 class="subtitle">
                    Aéronautique, Spatial, Recherche sous-marine, Médical, Bâtiment...
                    </h2>
                </div>
            </div>
        </section>

        <div class="container mt-6">
            <div class="container is-fluid">
                <div class="tile is-ancestor">
                    <div class="tile is-vertical">
                        <div class="tile">
                            <a class="tile is-parent is-vertical" @click="Scroll('presentation')">
                                <article class="tile is-child notification is-vidalmp">
                                    <p class="title">QUI SOMMES-NOUS ?</p>
                                    <p class="subtitle">Présentation</p>
                                    <figure class="image">
                                        <img src="/images/presentation-vidal-mp.jpg">
                                    </figure>
                                </article>
                            </a>
                            <a class="tile is-parent is-vertical" @click="Scroll('produits')">
                                <article class="tile is-child notification is-vidalmp">
                                    <p class="title">PRODUITS & SERVICES </p>
                                    <p class="subtitle">Prestations</p>
                                    <figure class="image">
                                        <img src="/images/mecanique-de-precision-toulouse.jpg">
                                    </figure>
                                </article>
                            </a>
                            <a class="tile is-parent is-vertical" @click="Scroll('machines')">
                                <article class="tile is-child notification is-vidalmp">
                                    <p class="title">NOTRE PARC</p>
                                    <p class="subtitle">Machines</p>
                                    <figure class="image">
                                        <img src="/images/parc-machines-vidal-mp.jpg">
                                    </figure>
                                </article>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="columns mt-6 shaar">
                    <div class="column is-two-fifths">
                        <figure class="image">
                            <img src="/images/piece-de-precision.jpg">
                        </figure>
                    </div>
                    <div class="column is-three-fifths">
                        <div class="content is-medium">
                            <h1>Vidal MP, spécialiste de la réalisation de pièces mécaniques de précision</h1>
                            <h4>La SARL VIDAL MP est une société de fraisage, dynamique et réactive.</h4>
                            <p>
                            Nous pouvons réaliser des grandes, moyennes et petites séries mais aussi des pièces unitaires et des prototypages.
                            Nous travaillons sur un panel de matières très varié et disposons de moyens de contrôle afin de vous garantir une qualité de service optimale. Nous développons en permanence notre parc machine notamment avec l'arrivée d'un bras robotisé en 2015.
                            </p>
                            <div class="buttons">
                              <button class="button is-vidalmp" @click="Scroll('presentation')">En savoir plus</button>
                              <button @click="isImageModalActive = true" class="button is-vidalmp">Voir notre vidéo de présentation<i class="ml-2 fa fa-play-circle"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <b-modal v-model="isImageModalActive">
            <video controls>
                <source src="/images/robot.webm" type="video/webm">
                Sorry, your browser doesn't support embedded videos.
            </video>
        </b-modal>

        <section class="hero is-vidalmp mt-6" ref="presentation">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                    QUI SOMMES-NOUS ?
                    </h1>
                    <router-link to="/contact" class="subtitle">Nous contacter</router-link>
                </div>
            </div>
        </section>

        <div class="container mt-6" >
            <div class="container is-fluid">
                <div class="content is-medium">
                    <h1>Réalisation de pièces mécaniques de précision</h1>
                    <p>La SARL VIDAL MP est une société de fraisage, dynamique et réactive en constante évolution qui compte un effectif de trois personnes. Nos points forts : REACTIVITE, DISPONIBILITE, FLEXIBILITE, pour répondre à vos besoins avec professionnalisme. Notre politique de qualité est axée sur le service apporté aux clients à travers :</p>
                    <ul>
                        <li>La réalisation de pièces de petite et moyenne série pour lesquels nous sommes équipés, formés et expérimentés.</li>
                        <li>Le respect des délais.</li>
                        <li>La conformité de nos produits.</li>
                        <li>L’amélioration continue de nos processus.</li>
                    </ul>
                    <div class="buttons">
                        <button class="button is-vidalmp" @click="Scroll('produits')">En savoir plus</button>
                    </div>
                </div>
            </div>
        </div>

        <section class="hero is-vidalmp mt-6" ref="produits">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                    NOS PRODUITS & SERVICES
                    </h1>
                    <router-link to="/contact" class="subtitle">Nous contacter</router-link>
                </div>
            </div>
        </section>

        <div class="container" >
            <div class="container is-fluid">
                <div class="columns mt-6 shaar">
                    <div class="column is-two-fifths">
                        <figure class="image">
                            <img src="/images/realisation-pieces-sur-mesure.jpg">
                        </figure>
                    </div>

                    <div class="column is-three-fifths">
                        <div class="content is-medium">
                            <h2>Réalisation de tous types de pièces sur mesure, adaptées à tous les besoins</h2>
                            <p>
                            Grâce à notre parc machine, nos qualifications et notre faculté d’adaptation, nous vous proposons la réalisation de pièces mécaniques de précision en grande série, moyenne série, petite série, pièce unitaire ou prototypage. Pour toute demande de renseignements complémentaires, n’hésitez pas à nous contacter. Notre équipe de professionnels s’efforcera de vous répondre dans les plus brefs délais.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="columns mt-6 shaar">
                    <div class="column is-three-fifths">
                        <div class="content is-medium">
                            <h2>Les matières travaillées et moyens de contrôle de production</h2>
                            <p>
                            Nous vous proposons tous types de pièces en acier, aluminium, inox, titane, matière plastique, carbonne ou cuivre. La grande diversité et complémentarité de nos machines nous permettent de travailler de nombreuses matières, de façon à répondre au mieux à vos attentes. Les rapports de contrôle de production sont réalisés selon vos besoins, au moyen d’une colonne de mesure Tesa et d’un bras Faro.
                            </p>
                        </div>
                    </div>

                    <div class="column is-two-fifths">
                        <figure class="image">
                            <img src="/images/bras-robot-articule.jpg">
                        </figure>
                    </div>
                </div>
            </div>
        </div>

        <section class="hero is-vidalmp mt-6" ref="machines">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                    DÉCOUVREZ NOTRE PARC MACHINE
                    </h1>
                    <router-link to="/contact" class="subtitle">Nous contacter</router-link>
                </div>
            </div>
        </section>

        <div class="container mt-6" >
            <div class="container is-fluid">
                <div class="columns">
                
                    <a class="column is-one-quarter" >
                        <div class="hero is-vidalmp">
                            <figure class="image is-1by1" @click="FullScreenImg">
                                <img src="/images/umc-750.png" >
                            </figure>
                            <div class="mx-4 my-4 machine">
                                <h1 class="title is-5">HAAS UMC 750</h1>
                                <h2 class="subtitle is-6">AVEC BRAS ROBOTISÉ ROBOFLEX 5 AXES</h2>
                            </div>
                        </div>
                    </a>

                    <a class="column is-one-quarter" >
                        <div class="hero is-vidalmp">
                            <figure class="image is-square">
                                <img src="/images/mikron-500.jpg" @click="FullScreenImg">
                            </figure>
                            <div class="mx-4 my-4 machine">
                                <h1 class="title is-5">MIKRON 500</h1>
                                <h2 class="subtitle is-6">COURSE - X : 500 - Y : 420 - Z : 400 BROCHE 7500 – 4ÈME AXE</h2>
                            </div>
                        </div>
                    </a>

                    <a class="column is-one-quarter" >
                        <div class="hero is-vidalmp">
                            <figure class="image is-square">
                                <img src="/images/super-minimill.jpg" @click="FullScreenImg">
                            </figure>
                            <div class="mx-4 my-4 machine">
                                <h1 class="title is-5">SUPER MINIMILL HAAS</h1>
                                <h2 class="subtitle is-6">COURSE - X : 400 - Y : 300 - Z : 200 BROCHE 10 000</h2>
                            </div>
                        </div>
                    </a>

                    <a class="column is-one-quarter" >
                        <div class="hero is-vidalmp">
                            <figure class="image is-square">
                                <img src="/images/vf2.jpg" @click="FullScreenImg">
                            </figure>
                            <div class="mx-4 my-4 machine">
                                <h1 class="title is-5">VF2 HAAS</h1>
                                <h2 class="subtitle is-6">COURSE - X : 750 - Y : 420 - Z : 400 BROCHE 7500 – 4ÈME AXE</h2>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="columns">
                
                    <a class="column is-one-third" >
                        <div class="hero is-vidalmp">
                            <figure class="image is-square">
                                <img src="/images/vf3.jpg" @click="FullScreenImg">
                            </figure>
                            <div class="mx-4 my-4 machine">
                                <h1 class="title is-5">VF3 HAAS</h1>
                                <h2 class="subtitle is-6">COURSE - X : 1020 - Y : 510 - Z : 500 BROCHE 10000 – 4ÈME & 5ÈME AXE</h2>
                            </div>
                        </div>
                    </a>

                    <a class="column is-one-third" >
                        <div class="hero is-vidalmp">
                            <figure class="image is-square">
                                <img src="/images/vf3ss.jpg" @click="FullScreenImg">
                            </figure>
                            <div class="mx-4 my-4 machine">
                                <h1 class="title is-5">VF3SS HAAS PALETTISÉ</h1>
                                <h2 class="subtitle is-6">COURSE - X : 1020 - Y : 510 - Z : 500 BROCHE 12500</h2>
                            </div>
                        </div>
                    </a>

                    <a class="column is-one-third" >
                        <div class="hero is-vidalmp">
                            <figure class="image is-square">
                                <img src="/images/vf4ss.jpg" @click="FullScreenImg">
                            </figure>
                            <div class="mx-4 my-4 machine">
                                <h1 class="title is-5">VF4SS HAAS PALETTISÉ</h1>
                                <h2 class="subtitle is-6">COURSE - X : 1250 – Y : 510 – Z : 500 BROCHE 12500</h2>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <section class="hero is-vidalmp mt-6" ref="references">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                    RÉFÉRENCES & CERTIFICATIONS
                    </h1>
                    <router-link to="/contact" class="subtitle">Nous contacter</router-link>
                </div>
            </div>
        </section>

        <div class="container" >
            <div class="container is-fluid">
                <div class="columns mt-6">
                    <div class="column is-two-fifths shaar">
                        <figure class="image p-20p">
                            <img src="/images/avion.png">
                        </figure>
                    </div>

                    <div class="column is-three-fifths shaar">
                        <div class="content is-medium">
                            <h2>Aéronautique</h2>
                            <p>
                            Dans le domaine aéronautique, notre parc machine nous permet de produire de nombreux types de pièces : pièces avionnables, pièces pour outillage, pièces de montage, etc... (Soumises à confidentialité).
                            </p>
                        </div>
                    </div>
                </div>

                <div class="columns mt-6">
                    <div class="column is-three-fifths shaar">
                        <div class="content is-medium">
                            <h2>Spatial</h2>
                            <p>
                            Nous sommes en capacité de produire également des éléments mécaniques de précision pour l’aérospatiale, comme des pièces embarquées pour satellites.
                            </p>
                        </div>
                    </div>

                    <div class="column is-two-fifths shaar">
                        <figure class="image p-20p">
                            <img src="/images/spatial.png">
                        </figure>
                    </div>
                </div>

                <div class="columns mt-6">
                    <div class="column is-two-fifths shaar">
                        <figure class="image p-20p">
                            <img src="/images/sous-marin.png">
                        </figure>
                    </div>

                    <div class="column is-three-fifths shaar">
                        <div class="content is-medium">
                            <h2>Recherche sous-marine</h2>
                            <p>
                            La recherche sous-marine est un secteur à la pointe de la technologie et confidentiel, pour toute demande de renseignements complémentaires, nous contacter.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="columns mt-6">
                    <div class="column is-three-fifths shaar">
                        <div class="content is-medium">
                            <h2>Médical</h2>
                            <p>
                            Production de pièces destinées à tout type de prothèses externes (Confidentialité du brevet client).
                            </p>
                        </div>
                    </div>

                    <div class="column is-two-fifths shaar">
                        <figure class="image p-20p">
                            <img src="/images/medical.png">
                        </figure>
                    </div>
                </div>

                <div class="columns mt-6">
                    <div class="column is-two-fifths shaar">
                        <figure class="image p-20p">
                            <img src="/images/batiment.png">
                        </figure>
                    </div>

                    <div class="column is-three-fifths shaar">
                        <div class="content is-medium">
                            <h2>Bâtiment</h2>
                            <p>
                            Dans le domaine de la construction, nous réalisons tous types de pièces suivant plans, réparations, séries, pièces de liaison, etc…
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr>

        <div class="container mt-6 mb-6">
            <div class="container is-fluid">
                <div class="columns mx-6">
                    <div class="column is-three-fifths">
                        <h1 class="title is-5 certif">NOS CERTIFICATIONS </h1>
                    </div>
                    <div class="column">
                        <figure class="image">
                            <img src="/images/logo-iso-9001.jpg">
                        </figure>
                    </div>
                    <div class="column">
                        <figure class="image">
                            <img src="/images/logo-en-9100.jpg">
                        </figure>
                    </div>
                </div>
            </div>
        </div>
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
        path: '/vidalmp',
        component: vidalmp,
    },
    {
        path: '/bettega',
        component: bettega,
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
        push: 0,
        anim: "fade",
    },
    methods: {
        Push() { // big brain
            this.anim = "none"
            this.push += 1
            let self = this
            HideNavbar()
            Vue.nextTick(function() {
                self.anim = "fade"
            })

        },
    },
    computed: {}
})


router.beforeEach(async function(to, from, next) {
    HideNavbar()
    next()
})

router.afterEach((to, from) => {
    if (to.path != from.path) {
        window.scrollTo(0, 0)
    }
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