<template>
    <div id="app">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
              integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
              crossorigin="anonymous">
        <div class="container">
            <ul class="nav" v-if="!$auth.check()">
                <li class="nav-item">
                    <router-link :to="{name: 'login'}" class="nav-link">Login</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'register'}" class="nav-link">Register</router-link>
                </li>
            </ul>
            <ul v-if="$auth.check()" class="nav">
                <li class="nav-item">
                    <router-link :to="{name: 'home'}" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'about'}" class="nav-link">About</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'profile'}" class="nav-link">Profile</router-link>
                </li>
                <li class="nav-item">
                    <a @click.prevent="logout()" class="nav-link">Logout</a>
                </li>

            </ul>
            <div v-if="$auth.ready()">
                <router-view/>
            </div>
            <div v-if="!$auth.ready()">
                <img src="./assets/loading.gif" alt="loading">
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'app',
        components: {},
        computed: {
        },
        created() {
        },
        methods: {
            logout() {
                this.$auth.logout({
                    success() {
                    }
                });
            }
        }
    }
</script>
<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    ul.nav {
        background-color: #424242;
    }

    ul.nav li a {
        color: #eeeeee !important;
    }

    ul.nav li a:hover {
        color: #FFF176 !important;
    }

    div.view {
        margin: 2rem;
    }

    [v-cloak] > * {
        display: none;
    }
</style>
