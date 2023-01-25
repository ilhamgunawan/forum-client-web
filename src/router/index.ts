import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/auth/signin',
      name: 'auth/signin',
      component: () => import('../views/AuthSignInView.vue'),
    },
    {
      path: '/forums',
      name: 'forums',
      component: () => import('../views/ForumsView.vue'),
    },
    {
      path: '*',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0, behavior: 'smooth' };
  },
});

export default router;
