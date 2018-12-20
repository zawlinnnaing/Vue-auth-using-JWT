<template>
    <div class="landing-page view">
        <h3>You are now logged in . </h3>
        <div v-if="this.user && !this.user.is_verified" class="alert alert-danger">
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
            return {}
        },
        computed: {
            user: {
                get: function () {
                    return this.$store.state.user
                }
            },
            // is_verify: {
            //     get : function () {
            //         return !!this.$store.state.user.email_verified_at
            //     }
            // }
        },
        created() {
            this.axios.get('/auth/home')
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error.data)
                });
            this.$store.dispatch('fetchUser', {vm: this});
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                console.log(vm.$store.getters.checkActiveUser);
                return vm.$store.getters.checkActiveUser;
            })
            // next(false);
        }
    }
</script>

<style scoped>
    [v-cloak]::before {
        display: none;
    }
</style>
