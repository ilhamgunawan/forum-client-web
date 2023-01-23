import Vue from 'vue';
import { createPinia, PiniaVuePlugin } from 'pinia';
import VueMeta from 'vue-meta';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import App from './App.vue';
import router from './router';

import './assets/main.css';

/* add icons to the library */
// library.add(faUserSecret);
library.add(fas);
library.add(far);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(PiniaVuePlugin);
Vue.use(VueMeta);

new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App),
}).$mount('#app');
