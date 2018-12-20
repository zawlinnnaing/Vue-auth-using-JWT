<template>
    <form @submit.prevent v-cloak>
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" aria-describedby="emailHelp"
                   placeholder="Enter email"
                   name="email"
                   v-model="email"
                   v-validate="'required|email'">
            <small v-show="!errors.has('email')" id="emailHelp" class="form-text text-muted">We'll never share your
                email with anyone else.
            </small>
            <span v-show="errors.has('email')" class="form-text alert-danger invalid-msg" role="alert">
                {{ errors.first('email')}}
            </span>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" name="password" placeholder="Password"
                   v-model="password"
                   v-validate="'required|min:8'">
            <span v-show="errors.has('password')" class="form-text alert-danger invalid-msg" role="alert">
                {{ errors.first('password')}}
            </span>
        </div>
        <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="remember">
            <label class="form-check-label" for="exampleCheck1">Remember me</label>
        </div>
        <button type="submit" class="btn btn-primary" @click="sendLoginRequest">Submit</button>
        <div class="error-box">
            <p v-show="this.wrongCredentials" class="alert alert-danger">Wrong Password or email</p>
        </div>
    </form>
</template>

<script>
    export default {
        name: "LoginForm",
        data() {
            return {
                email: '',
                password: '',
                remember: false,
                wrongCredentials: false
            }
        },
        methods: {
            sendLoginRequest: function () {
                let self = this;
                this.$validator.validateAll()
                    .then((result) => {
                        if (result) {
                            self.$auth.login({
                                data: {
                                    'email': self.email,
                                    'password': self.password
                                },
                                rememberMe: self.remember,
                            }).then(function (response) {
                                self.$store.dispatch('fetchUser', {vm: self});
                            }).catch(function (error) {
                                console.log(error);
                                self.wrongCredentials = true;
                            });
                        }
                    });
            }
        }
    }
</script>

<style scoped>
    div.error-box {
        margin: 1rem 0;
    }

    .invalid-msg {
        margin: 1rem 0;
    }
</style>
