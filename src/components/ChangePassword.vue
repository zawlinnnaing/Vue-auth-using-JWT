<template>
    <div class="view">
        <div class="row">
            <div class="card password-card col-md-8">
                <div class="card-body">
                    <form>
                        <input type="hidden" :value="user.id">
                        <div class="form-group">
                            <label for="old_password">Old Password</label>
                            <input type="password" name="old_password" id="old_password" aria-describedby="old_password"
                                   v-validate="'required'"
                                   v-model="oldPassword"
                                   :class="{'form-control' : true , 'is-invalid' : errors.has('old_password')}"
                                   required>
                            <span v-show="errors.has('old_password')" class="form-text alert-danger invalid-msg"
                                  role="alert">
                {{ errors.first('old_password')}}
            </span>
                        </div>
                        <div class="form-group">
                            <label for="new_password">New Password</label>
                            <input type="password" name="new_password" id="new_password" aria-describedby="new_password"
                                   ref="new_password"
                                   v-validate="'required|min:8'"
                                   v-model="newPassword"
                                   :class="{'form-control' : true , 'is-invalid' : errors.has('new_password')}"
                                   required>
                            <span v-show="errors.has('new_password')" class="form-text alert-danger invalid-msg"
                                  role="alert">
                {{ errors.first('new_password')}}
            </span>
                        </div>
                        <div class="form-group">
                            <label for="confirm_password">Confirm Password</label>
                            <input type="password" class="form-control" id="confirm_password"
                                   name="confirm_password"
                                   v-validate="'required|confirmed:new_password'"
                                   :class="{'form-control' : true , 'is-invalid' : errors.has('confirm_password')}"
                                   v-model="confirmPassword" required>
                            <span v-show="errors.has('confirm_password')" class="form-text alert-danger invalid-msg"
                                  role="alert">
                {{ errors.first('confirm_password')}}
            </span>
                        </div>
                        <button type="submit" class="btn btn-primary" @click.prevent="changePassword()">Confirm</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="invalid-msg alert alert-danger" v-show="hasError">{{ error }}</div>
    </div>
</template>

<script>
    export default {
        name: "ChangePassword",
        data() {
            return {
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
                hasError: false,
                error: ''
            }
        },
        computed: {
            user: {
                get: function () {
                    return this.$store.state.user
                }
            }
        },
        methods: {
            changePassword: function () {
                let self = this;
                this.$validator.validateAll()
                    .then((result) => {
                        if (result && self.newPassword === self.confirmPassword) {
                            let params = {
                                id: self.user.id,
                                old_password: self.oldPassword,
                                password: self.newPassword,
                                password_confirmation: self.confirmPassword
                            };
                            let url = 'auth/profile/change_password';
                            self.axios.post(url, params)
                                .then((response) => {
                                    console.log(response.data.message);
                                    alert(response.data.message);
                                    self.$router.push({name: 'profile'});
                                })
                                .catch((error) => {
                                    self.hasError = true;
                                    self.error = error.response.data.error;
                                })
                        }
                    })
                    .catch(() => {
                        console.log('errors')
                    });
            }
        }
    }
</script>

<style scoped>
    div.password-card {
        width: 500px;
    }

    div.view {
        margin: 2rem 0;
    }
</style>
