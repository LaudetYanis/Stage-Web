var vm = new Vue({
    el: '#app',
    data: {
        title: "",
        content: "",
        image: "",
    },
    methods: {
        filename: function() {

            if (this.$refs.inputimage) {
                if (this.$refs.inputimage.files.length > 0) {

                    let reader = new FileReader();
                    let img = this.$refs.image
                    reader.onload = function(event) {
                        img.src = event.target.result;
                    };
                    reader.readAsDataURL(this.$refs.inputimage.files[0]);
                    return this.$refs.inputimage.files[0].name
                }
            }

            return ""
        },
        refresh: function(event) {
            this.$forceUpdate()
        },
        Errors() {
            let errors = [];

            if (this.title.trim().length == 0) {
                errors.push("Le titre est vide")
            }

            if (this.content.trim().length == 0) {
                errors.push("Le post est vide")
            }

            if (this.$refs.inputimage && !this.$refs.inputimage.files[0]) {
                errors.push("Le post n'a pas d'image")
            }

            return errors;
        },
        async Post() {
            let formData = new FormData();
            formData.append('title', this.title);
            formData.append('content', this.content);
            formData.append('image', this.$refs.inputimage.files[0]);

            let rep = await axios.post('/api/news',
                formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )

            if (!rep.data.err) {
                this.$buefy.dialog.alert({
                    title: '',
                    message: 'News posté avec succès',
                    confirmText: 'OK',
                    onConfirm: () => { window.location.href = '/news'; }
                })
            } else {
                this.$buefy.dialog.alert({
                    title: 'Erreur',
                    message: ep.data.err,
                    type: 'is-danger',
                    hasIcon: true,
                    icon: 'times-circle',
                    iconPack: 'fa',
                    ariaRole: 'alertdialog',
                    ariaModal: true
                })
            }
        }
    }
});