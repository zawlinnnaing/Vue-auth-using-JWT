import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
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
        fetchUser(context, {vm}) {
            vm.$auth.fetch({
                success(user) {
                    context.commit('setUser', user.data);
                }
            });
        }
    }
})
