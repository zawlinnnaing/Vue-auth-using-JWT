<template>
    <div class="home view">
        <div v-if="$auth.check()">
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
        components: {
            LandingPage,
            LoginForm
        },

    }
</script>
