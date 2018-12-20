<template>
    <div class="about view">
        <h1>This is an about page</h1>
    </div>
</template>
<script>
    export default {
        name: 'about',
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
