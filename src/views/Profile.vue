<template>
    <div class="view">
        <div class="row">
            <div class="col-md-8">
                <form @submit.prevent v-cloak>
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" name="username" id="username" aria-describedby="userName"
                               placeholder="Enter username"
                               v-validate="'required|max:256'"
                               v-model="user.name"
                               :disabled="isDisabled"
                               :class="{'form-control' : true , 'is-invalid' : errors.has('username')}"
                               required>
                        <span v-show="errors.has('username')" class="form-text alert-danger invalid-msg" role="alert">
                {{ errors.first('username')}}
            </span>
                    </div>
                    <!--<div :class="{'form-group' : true , 'has-error' : errors.has('email')}">-->
                    <div class="form-group">
                        <label for="email">Email address</label>
                        <input type="email" id="email" name="email" aria-describedby="emailHelp"
                               placeholder="Enter email"
                               v-validate="'required|email'"
                               v-model="user.email"
                               :disabled="isDisabled"
                               :class="{'form-control' : true , 'is-invalid' : errors.has('email')}"
                               required>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
                            else.
                        </small>
                        <span v-show="errors.has('email')" class="form-text alert-danger invalid-msg" role="alert">
                {{ errors.first('email') + 'has errors'+ errors.has('email')}}
            </span>
                    </div>
                    <router-link :to="{name:'changePassword'}" class="btn btn-primary">Change Password
                    </router-link>
                    <span style="padding: 0 1rem"></span>
                    <button class="btn btn-primary" @click="edit()" v-show="isDisabled">edit</button>
                    <span style="padding: 0 1rem"></span>
                    <button class="btn btn-primary" v-show="!isDisabled" @click="undoEdit()">Undo Edit</button>
                    <span style="padding: 0 1rem"></span>
                    <button type="submit" class="btn btn-primary" @click="update()" v-show="!isDisabled">Update</button>
                </form>
            </div>
        </div>

        <div v-show="hasMsg"
             :class="{'alert': true, 'alert-danger': hasError, 'alert-success': !hasError , 'view': true}">
            {{ message }}
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import checkActiveUser from "@/middleware/CheckIsActive";

    export default {
        name: "Profile",
        data() {
            return {
                isDisabled: true,
                dataUser: {},
                hasMsg: false,
                hasError: false,
                message: '',
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            },

        },
        created() {

        },
        methods: {
            edit: function () {
                this.isDisabled = false;
            },
            undoEdit() {
                this.isDisabled = true;

            },
            update() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        let url = '/auth/user/' + this.user.id;
                        let self = this;
                        let params = {
                            email: this.user.email,
                            name: this.user.name
                        };
                        this.axios.put(url, params)
                            .then((response) => {
                                self.hasMsg = true;
                                self.hasError = false;
                                self.message = 'Profile updated successfully';
                                self.$store.commit('setUser', response.data);
                            })
                            .catch((error) => {
                                self.hasError = true;
                                self.message = error.message;
                            })
                    }
                });
            }
        },
        beforeRouteEnter(to, from, next) {
            checkActiveUser(to, from, next)
        }
    }
</script>

<style scoped>
    button:disabled, button[disabled] {
        background-color: #9E9E9E !important;
        border: 1px solid #9E9E9E;
    }
</style>
