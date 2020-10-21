

const Select = document.querySelector.bind(document);


var inboxVue = new Vue({
	el: '#mail-app',
	data: {
		content: "",
		messages: {},
		id:0,
	},
	methods: {
		showMessage: function(msg, index) {
			Select( "#message-pane").classList.remove( 'is-hidden' )
			document.querySelectorAll(".card").forEach( el => {
				el.classList.remove( 'active' )
			});
			Select( "#mail").innerText = msg.email
			if( Select( "#msg-card-" + index) ){
				Select( "#msg-card-" + index).classList.add( 'active' )
			}

			let mail_entre

			if( msg.entreprise != "NULL" ){
				mail_entre = msg.email + " ( " + msg.entreprise + " )"
			}else{
				mail_entre = msg.email
			}
			
			Select( "#mail").innerText = mail_entre
			Select( "#phone").innerText = msg.tel
			Select( "#name").innerText = msg.nom

			this.content = msg.message
			this.id = index
		},
		Download: function( num ){

			let file = this.messages[this.id].files[num]
			let element = document.createElement('a');
			element.href = "/api/file/" + file.md5
			let filename = file.name
			element.setAttribute('download', filename );
			element.style.display = 'none';
			document.body.appendChild(element);
			element.click();
			document.body.removeChild(element);
			
		}
	}
});



async function Devis(){
	let rep = await axios.get('/api/devis')

	for (const [k, v] of Object.entries(rep.data)) {

		//for (var i = (k-1*10); i <= (k*10); i++) {
		//	inboxVue.messages[i] = v
		//}

		inboxVue.messages[k] = v
	}


	inboxVue.$forceUpdate()
	if( inboxVue.messages[0] ){
		inboxVue.showMessage( inboxVue.messages[0] , 0 )
	}
	
}

Devis()