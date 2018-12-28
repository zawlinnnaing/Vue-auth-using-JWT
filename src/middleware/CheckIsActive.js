import store from "@/store";

export default function checkActiveUser(to, from, next) {
    next(vm => {
        vm.$auth.fetch({
            success: function (user) {
                vm.$store.commit('setUser', user.data);
                vm.$store.dispatch('fetchPosts', user.data.id)
            }
        });
        vm.$store.watch(vm.$store.getters.getLoadedUser, function () {
            if (vm.$store.getters.checkActiveUser === undefined) {
                next(false);
            } else {
                if (vm.$store.getters.checkActiveUser) {
                    next();
                } else {
                    next({name: 'inactiveMessage'});
                }
            }
        });
    });

}
