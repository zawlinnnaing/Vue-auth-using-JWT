<template>

</template>

<script>
    export default {
        name: "RetrieveToken",
        props: {
            token: {
                type: String,
                default: null,
            }
        },
        mounted() {
            this.axios.get('/auth/verify-email', {
                params: {
                    token: this.token
                }
            })
                .then((response) => {
                    console.log(response.data);
                    this.$router.push({name: 'home', params: {message: 'Email is verified'}})
                })
        }
    }
</script>

<style scoped>

</style>
