import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

Vue.use(Vuex);
Vue.use(VueRouter);


export const store = new Vuex.Store({
    state: {
        user: {},
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
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        // fetchUser(context, {vm}) {
        //     console.log(vm.$route);
        //     console.log(this._vm.$route);
        //     // this._vm.$route = vm.$route;
        //     vm.$auth.fetch({
        //         success(user) {
        //             // console.log('hi from successful fetch vuex');
        //             context.commit('setUser', user.data);
        //         },
        //         error() {
        //             console.log('error occurred');
        //         }
        //     });
        // }

    }
});

export function storeInjector(fn) {
    return (...args) => fn(...args, store);
}
