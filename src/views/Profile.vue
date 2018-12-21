<template>
    <div class="view">
        {{ user.email }}
    </div>
</template>

<script>
    export default {
        name: "Profile",
        computed : {
            user : {
                get: function () {
                    return this.$store.state.user
                }
            }
        },
        created() {

        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$auth.fetch({
                    success: function (user) {
                        vm.$store.commit('setUser',user.data);
                    }
                });
                vm.$store.watch(vm.$store.getters.getLoadedUser, function () {
                    if (vm.$store.getters.checkActiveUser === undefined) {
                        console.log('from undefined');
                        next(false);
                    } else {
                        if (vm.$store.getters.checkActiveUser) {
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

<style scoped>
</style>
