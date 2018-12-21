<template>
    <div class="view">
        <div class="row">
            <form @submit.prevent v-cloak>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" name="username" id="username" aria-describedby="userName"
                           placeholder="Enter username"
                           v-validate="'required|max:256'"
                           v-model="this.user.name"
                           required>
                    <span v-show="errors.has('username')" class="form-text alert-danger invalid-msg" role="alert">
                {{ errors.first('username')}}
            </span>
                </div>
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp"
                           placeholder="Enter email"
                           v-validate="'required|email'"
                           v-model="this.user.email"
                           :disabled="this.isDisabled"
                           required>
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.
                    </small>
                    <span v-show="errors.has('email')" class="form-text alert-danger invalid-msg" role="alert">
                {{ errors.first('email')}}
            </span>
                </div>
                <button type="submit" class="btn btn-primary" @click="edit()">edit</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Profile",
        data() {
            return {
                isDisabled: true,
                dataUser: {}
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            }
        },
        created() {

        },
        methods: {
            edit: function () {
                this.isDisabled = false;
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$auth.fetch({
                    success: function (user) {
                        vm.$store.commit('setUser', user.data);
                    }
                });
                vm.$store.watch(vm.$store.getters.getLoadedUser, function () {
                    if (vm.$store.getters.checkActiveUser === undefined) {
                        console.log('from undefined');
                        next(false);
                    } else {
                        if (vm.$store.getters.checkActiveUser) {
                            console.log('from true');
                            next();
                        } else {
                            next({name: 'inactiveMessage'});
                        }
                    }
                });
            });
        }
    }
</script>

<style scoped>
</style>
