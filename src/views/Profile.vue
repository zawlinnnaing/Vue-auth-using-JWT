<template>
    <div class="view">
        {{ user.email }}
    </div>
</template>

<script>
    export default {
        name: "Profile",
        data() {
            return {
                user: ''
            }
        },
        created() {
            this.$auth.fetch({
                    success(user) {
                        this.user = user.data;
                    },
                }
            );
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$store.dispatch('fetchUser', {vm: vm});
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
