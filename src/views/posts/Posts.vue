<template>
    <div class="view">
        <post v-for="post in posts"
              :key="post.id"
              :title="post.title"
              :body="post.body"
              :id="post.id">
        </post>
        <p>{{ id }}</p>
    </div>
</template>

<script>
    import Post from "@/components/posts/Post";

    export default {
        name: "Posts",
        components: {Post},
        component: {
            post: Post
        },
        computed: {
            posts() {
                return this.$store.state.posts;
            },
            id() {
                return this.$store.getters.getUserId;
            }
        },
        created() {

        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$auth.fetch({
                    success: function (user) {
                        vm.$store.commit('setUser', user.data);
                        vm.$store.dispatch('fetchPosts', user.data.id)
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
