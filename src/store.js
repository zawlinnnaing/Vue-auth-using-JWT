import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

Vue.use(Vuex);
Vue.use(VueRouter);


export default new Vuex.Store({
    state: {
        user: {},
        posts: [],
    },
    getters: {
        checkActiveUser: (state) => {
            return state.user.active;
        },
        getLoadedUser: (state) => {
            return function () {
                return state.user;
            }
        },
        getUserEmail: (state) => {
            return state.user.email;
        },
        getUserId(state) {
            return state.user.id;
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        clearUser(state) {
            state.user = {};
        },
        clearPosts(state) {
            state.posts = [];
        },
        setPosts(state, posts) {
            state.posts = posts;
        },
    },
    actions: {
        fetchPosts(context, id) {
            let token = this._vm.$auth.token();
            let headers = {
                'Authorization': 'Bearer ' + token
            };
            let url = '/auth/' + id + '/post';
            this._vm.axios({
                method: 'get',
                url: url,
                headers: headers
            }).then((response) => {
                let posts = response.data.data;
                context.commit('setPosts', posts);
            }).catch((error) => {
                console.log(error.response);
            })
        },
        createPost(context,payload) {
            let token = this._vm.$auth.token();
            let headers = {
                'Authorization': 'Bearer ' + token
            };
            let url = '/auth/' + payload.id + '/post';
            let params = {
                title: payload.title,
                body: payload.body
            };
            console.log(params);
            this._vm.axios({
                method: 'post',
                url: url,
                headers: headers,
                data: params
            }).then((response) => {
                console.log(response.data)
            }).catch((error) => {
                console.log(error.response)
            });
        }

    }
});

