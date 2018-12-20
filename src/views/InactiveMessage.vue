<template>
    <div class="view alert alert-danger">
        Your account had been deactivated. Please verify your email to activate . Click
        <a class="link" @click.prevent="sendVerificationEmail()">here</a>
        to resend verification email.
    </div>
</template>

<script>
    export default {
        name: "InactiveMessage",
        data() {
            return {
                url: '/auth/send_verification_email',
                // email: this.$store.state.user.email
            }
        },
        computed: {
            email: {
                get: function () {
                    return this.$store.getters.getUserEmail
                }

            }
        },
        methods: {
            sendVerificationEmail() {
                let self = this;
                console.log('email :' + this.email);
                this.axios.post(this.url, {
                    'email' : this.email
                })
                    .then(() => {
                        alert('Verification send to ' + self.email)
                    })
            }
        }
    }
</script>

<style scoped>
    a.link {
        color: #03A9F4 !important;
    }
</style>
