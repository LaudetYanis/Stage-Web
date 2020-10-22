var vm = new Vue({
    el: '#app',
    data: {
        title: "",
        content: "",
        image: "",
    },
    methods: {
        filename: function() {

            console.log("think")

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
        refresh: function() {
            this.$forceUpdate()
        }
    }
});