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
            user : {
                get : function () {
                    return this.$store.state.user;
                }
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
            next(vm => {
                vm.$store.dispatch('fetchUser', {vm: vm});
                vm.$store.watch(vm.$store.getters.getLoadedUser, function () {
                    if (vm.$store.getters.checkActiveUser === undefined) {
                        console.log('from undefined');
                        next(false);
                    } else {
                        if (vm.$store.getters.checkActiveUser){
                            console.log('from true');
                             next();
                        } else {
                            next({name: 'inactiveMessage'});
                        }
                    }
                });
            });
        }
    }
</script>
