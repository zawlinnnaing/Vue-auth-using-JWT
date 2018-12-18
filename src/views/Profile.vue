<template>
    <div class="view">
        {{ user.email }}
    </div>
</template>

<script>
    export default {
        data () {
          return {
              user : ''
          }
        },
        name: "Profile",
        created() {
              this.$auth.fetch({
                success(user){
                    this.user = user.data;
                },
                }
            );
        }
    }
</script>

<style scoped>
</style>
