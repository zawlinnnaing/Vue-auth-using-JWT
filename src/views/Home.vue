<template>
    <div class="home view">

        <div v-if="$auth.check()">
            <div v-if="this.user">{{ this.user.email }}</div>
            <landing-page :message="this.message"></landing-page>
        </div>
        <div v-else>
            <login-form></login-form>
        </div>
    </div>
</template>
<script>
    // @ is an alias to /src

    import LandingPage from "@/components/LandingPage";
    import LoginForm from "@/components/LoginForm";
    import checkActiveUser from "@/middleware/CheckIsActive";

    export default {
        name: 'home',
        props: {
            message: {
                default: null
            }
        },
        beforeCreate() {
            // this.$store.dispatch('fetchUser', {vm: this});
            // console.log(this.$store.state.user);
            // .then(() => {
            //     this.user = this.$store.state.user;
            // });
        },
        computed: {
            user() {
                return this.$store.state.user
            }
        },
        // watch: {
        //     user: function (oldValue, newValue) {
        //         this.user = newValue;
        //     }
        // },
        components: {
            LandingPage,
            LoginForm
        },


        methods: {},
        beforeRouteEnter(to, from, next) {
            checkActiveUser(to, from, next)
        }
    }
</script>
