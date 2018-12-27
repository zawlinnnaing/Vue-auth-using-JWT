import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import store from './store'

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(VeeValidate);
Vue.axios.defaults.baseURL = 'http://localhost:8000/api/v1';
Vue.router = router;
Vue.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Vue.use(require('@websanova/vue-auth'), {
    auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js')
});

new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {
        // console.debug("MOUNTED", this.$router)
    }
}).$mount('#app');


