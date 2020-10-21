

const Select = document.querySelector.bind(document);


var inboxVue = new Vue({
	el: '#mail-app',
	data: {
		content: "",
		messages: {},
	},
	methods: {
		showMessage: function(msg, index) {
			console.log( msg, index )
			Select( "#message-pane").classList.remove( 'is-hidden' )
			document.querySelectorAll(".card").forEach( el => {
				el.classList.remove( 'active' )
			});
			Select( "#mail").innerText = msg.email
			if( Select( "#msg-card-" + index) ){
				Select( "#msg-card-" + index).classList.add( 'active' )
			}
			
			Select( "#mail").innerText = msg.email
			Select( "#name").innerText = msg.nom

			this.content = msg.message
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