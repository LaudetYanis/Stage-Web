var vm = new Vue({
    el: '#app',
    data: {
        news: [],
        isLoading: true
    },
    mounted: async function() {
        console.log(this)

        let rep = await axios.get('/api/news');
        this.news = rep.data

        this.isLoading = false
    },
    methods: {
        Delete: function(key) {

            let self = this

            let arg = this.news[key].article_id
            this.$buefy.dialog.confirm({
                title: 'Supprimer la news ?',
                message: 'Voulez-vous vraiment <b> supprimer </b> la news? Cette action ne peut pas être annulée.',
                confirmText: 'Supprimer',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: async() => {
                    let rep = await axios.delete(`/api/news/${arg}`)

                    if (!rep.data.err) {
                        self.news.splice(key, 1);
                        self.news.filter(function(val) { return val });
                    }
                }
            })
        }
    }
});