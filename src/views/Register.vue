<template>
<div class="view">
    <div class="loading" v-if="loading">
        <img src="../assets/loading.gif">
    </div>
    <register-form></register-form>
</div>
</template>

<script>
    import RegisterForm from "@/components/RegisterForm";

    export default {
        name: "Register",
        components:{
            RegisterForm
        },
        data () {
            return {
                loading: true
            }
        },
        mounted () {
            this.loading = false
        }
    }
</script>

<style scoped>
    div.loading {
        /*width: 100vw;*/
    }
</style>
