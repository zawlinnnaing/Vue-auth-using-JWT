<template>
    <form @submit.prevent v-cloak>
        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control" name="username" id="username" aria-describedby="userName"
                   placeholder="Enter username"
                   v-validate="'required|max:256'"
                   v-model="username" required>
            <span v-show="errors.has('username')" class="form-text alert-danger invalid-msg" role="alert">
                {{ errors.first('username')}}
            </span>
        </div>
        <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp"
                   placeholder="Enter email"
                   v-validate="'required|email'"
                   v-model="email" required>
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            <span v-show="errors.has('email')" class="form-text alert-danger invalid-msg" role="alert">
                {{ errors.first('email')}}
            </span>
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" name="password" placeholder="Password"
                   v-validate="'required|min:8'"
                   v-model="password"
                   ref="password" required>
            <span v-show="errors.has('password')" class="form-text alert-danger invalid-msg" role="alert">
                {{ errors.first('password')}}
            </span>
        </div>
        <div class="form-group">
            <label for="confirm_password">Confirm Password</label>
            <input type="password" class="form-control" id="confirm_password" placeholder="Password"
                   name="confirm_password"
                   v-validate="'required|confirmed:password'"
                   v-model="confirmPassword" required>
            <span v-show="errors.has('confirm_password')" class="form-text alert-danger invalid-msg" role="alert">
                {{ errors.first('confirm_password')}}
            </span>
        </div>
        <button type="submit" class="btn btn-primary" @click="register()">Submit</button>

        <div v-show="res" class="msg-box">
            <p v-for="message in resMsg" :key="resMsg.indexOf(message)" :class="['alert',{'alert-danger': error }] ">
                {{message}}
            </p>
        </div>
    </form>

</template>

<script>
    export default {
        name: "RegisterForm",
        data() {
            return {
                username: '',
                email: '',
                password: '',
                confirmPassword:'',
                res: false,
                resMsg: [],
                error: false
            }
        },
        computed : {
        },
        methods: {

            register() {
                let self = this;
                this.resMsg.length = 0;
                this.$validator.validateAll().then((result) => {
                    if (result && self.password === self.confirmPassword) {
                        self.$auth.register({
                            data: {
                                name: self.username,
                                email: self.email,
                                password: self.password
                            },
                            success: function (response) {
                                self.res = true;
                                self.resMsg = response.data;
                            },
                            error: function ({response: {data: {errors: errors}}}) {
                                self.res = true;
                                self.error = true;
                                for (let key in  errors) {
                                    if (errors.hasOwnProperty(key)) {
                                        console.log(errors[key][0]);
                                        self.resMsg.push(errors[key][0]);
                                    }

                                }
                            },
                            autoLogin: true,
                            redirect: {name: 'home'}
                        });

                    }
                });
            }
        }
    }
</script>

<style scoped>
    div.msg-box {
        margin: 1em 0;
    }
    .invalid-msg{
        margin: 1rem 0;
    }
</style>
