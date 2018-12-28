<template>
    <div class="about view">
        <h1>This is an about page</h1>
    </div>
</template>
<script>
    import checkActiveUser from "@/middleware/CheckIsActive";

    export default {
        name: 'about',
        computed: {
            user: {
                get: function () {
                    return this.$store.state.user;
                }
            }
        },
        beforeRouteEnter(to, from, next) {
            checkActiveUser(to,from,next)
        }
    }
</script>
<style scoped>

</style>
