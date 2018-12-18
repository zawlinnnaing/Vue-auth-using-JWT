<template>
    <div class="landing-page view">
        <h3>You are now logged in . </h3>
        <div v-if="!this.is_verify" class="alert alert-danger">
             Please check your email to verify . If you don't verify your account ,
            <strong>it will be deleted in a week !</strong>
        </div>
        <div v-if="this.message" class="alert alert-success">
            {{ this.message }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "LandingPage",
        props: {
            message: {
                default: null
            }
        },
        data() {
            return {
                user: '',
                is_verify: true
            }
        },
        created() {

            this.axios.get('/auth/home')
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error.data)
                });

            this.$auth.fetch({
                    success(user) {
                        this.user = user.data;
                        this.is_verify = (this.user.email_verified_at);
                    },
                }
            );
        }
    }
</script>

<style scoped>
    [v-cloak]::before {
        display: none;
    }
</style>
