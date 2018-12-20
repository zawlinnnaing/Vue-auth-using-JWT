import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NotFound from "@/views/NotFound";
import Login from "@/views/Login";
import Profile from "@/views/Profile";
import Register from "@/views/Register";
import RetrieveToken from "@/views/RetrieveToken";
import store from '@/store'
import InactiveMessage from "@/views/InactiveMessage";

Vue.use(Router);

const authUser = {
    auth: true,
    authRedirect: {
        path: '/login'
    }
};

const guestUser = {
    roles: 'user',
    redirect: {
        name: 'home'
    }
};


export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            props: true,
            name: 'home',
            meta: authUser,
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            meta: {
                authUser,
            },
            beforeEnter: (to, from, next) => {
                console.log(store.state.user);
                next();
            },
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/login',
            name: 'login',
            meta: guestUser,
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            meta: guestUser,
            component: Register
        },
        {
            path: '/profile',
            name: 'profile',
            meta: authUser,
            component: Profile
        },
        {
            path: '/retrieve-token/',
            name: 'retrieveToken',
            props: (route) => ({token: route.query.token}),
            component: RetrieveToken
        },
        {
          path: '/inactive-msg',
          name: 'inactiveMessage',
          component: InactiveMessage
        },
        {
            path: '*',
            component: NotFound
        }
    ]
})
