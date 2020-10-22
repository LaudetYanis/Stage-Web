

const Select = document.querySelector.bind(document);

function resolveAfter2Seconds() {
  return new Promise(resolve => {
	setTimeout(() => {
	  resolve('resolved');
	}, 2000);
  });
}

var inboxVue = new Vue({
	el: '#mail-app',
	data: {
		content: "",
		messages: [],
		id:0,
		isLoading: false
	},
	methods: {
		alertCustom( num ) {
			this.$buefy.dialog.alert({
				title: 'Title Alert',
				message: num,
				confirmText: 'Cool!'
			})
		},
		showMessage: function(msg, index) {

			Select( "#message-pane").classList.remove( 'is-hidden' )

			document.querySelectorAll(".card").forEach( el => {
				el.classList.remove( 'active' )
			});

			Select( "#mail").innerText = msg.email

			Select( "#msg-card-" + index).classList.add( 'active' )

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
			this.isLoading = false
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

		},
		Delete: function(){

			let self = this; // pfffffff

			this.$buefy.dialog.confirm({
				title: 'Supprimer la demande de devis ?',
				message: 'Voulez-vous vraiment <b> supprimer </b> la demande? Cette action ne peut pas être annulée.',
				confirmText: 'Supprimer',
				type: 'is-danger',
				hasIcon: true,
				onConfirm: async function(){

					console.log( self )
					let rep = await axios.get('/api/delete/' + self.messages[self.id].devis_id)

					console.log( rep )

					if(rep.data.err){

						return
					}

					console.log( self.messages )

					this.$buefy.toast.open('Supprimé')
					self.messages.splice(self.id, 1);
					self.messages.filter(function(val){return val});
					

					if( self.messages[self.id] ){ // horrible lol
						inboxVue.showMessage( self.messages[self.id] , self.id )
					}else if( self.messages[self.id+1] ){
						inboxVue.showMessage( self.messages[self.id+1] , self.id+1 )
					}else if( self.messages[self.id-1] ){
						inboxVue.showMessage( self.messages[self.id-1] , self.id-1 )
					}else{
						// tout hide
						Select( "#message-pane").classList.add( 'is-hidden' )
						inboxVue.alertCustom( "vous avez plus de messages" )
					}

					inboxVue.$forceUpdate()
				}
			})
		},
	}
});



async function Devis(){

	inboxVue.isLoading = true

	let rep = await axios.get('/api/devis')

	for (const [k, v] of Object.entries(rep.data)) {

		//for (var i = (k-1*10); i <= (k*10); i++) {
		//	inboxVue.messages[i] = v
		//}

		inboxVue.messages[k] = v
	}

	inboxVue.isLoading = false

	inboxVue.$forceUpdate()
	
	

	Vue.nextTick(function () {
		if( inboxVue.messages[0] ){
			inboxVue.showMessage( inboxVue.messages[0] , 0 )
		}
	})

	
	if( inboxVue.messages.lenght == 0 ){
		inboxVue.alertCustom( "vous avez plus de messages" )
	}
	
}

Devis()