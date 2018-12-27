import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NotFound from "@/views/NotFound";
import Login from "@/views/Login";
import Profile from "@/views/Profile";
import Register from "@/views/Register";
import RetrieveToken from "@/views/RetrieveToken";
import InactiveMessage from "@/views/InactiveMessage";
import ChangePassword from "@/components/ChangePassword";
import Posts from "@/views/posts/Posts";
import CreatePost from "@/views/posts/CreatePost";

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

// function checkActiveUser(to, from, next, store) {
//
//     vm.$auth.fetch({
//         success: function (user) {
//             store.commit('setUser',user.data)
//         },
//         error: function () {
//             console.log('fetch failed')
//         }
//     });
//     store.watch(store.getters.getLoadedUser, function () {
//         if (store.getters.checkActiveUser === undefined) {
//             console.log('from undefined');
//             next(false);
//         } else {
//             if (store.getters.checkActiveUser) {
//                 console.log('from true');
//                 next();
//             } else {
//                 next({name: 'inactiveMessage'});
//             }
//         }
//     });
// }

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            props: true,
            name: 'home',
            meta: authUser,
            // beforeEnter: (to, from, next) => {
            //     storeInjector(checkActiveUser(to, from, next, store))
            // },
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            meta: authUser,
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
            component: Profile,
            children: [
                {
                    path: 'change_password',
                    name: 'changePassword',
                    component: ChangePassword
                }
            ]
        },
        {
            path: '/posts',
            name: 'posts',
            component: Posts,
            meta: authUser
        },
        {
            path: '/posts/create_post',
            name: 'createPost',
            meta: authUser,
            component: CreatePost
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
