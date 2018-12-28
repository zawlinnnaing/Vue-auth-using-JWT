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
    import checkActiveUser from "@/middleware/CheckIsActive";

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
            checkActiveUser(to, from, next)
        }
    }
</script>

<style scoped>

</style>
