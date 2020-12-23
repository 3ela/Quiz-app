import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFound.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/results',
    name: 'Results',
    component: () => import(/* webpackChunkName: "results" */ '../views/Results.vue')
  },
  {
    path: '/question/:number',
    name: 'Quiz',
    component: () => import(/* webpackChunkName: "about" */ '../views/Quiz.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if(to.name == 'Results') {
    if(store.state.userAnswers.includes(undefined) || store.state.userAnswers.length <= 9){
      from.name == 'Results' ? next('/') : next(false);
    }else {
      store.dispatch('calculateResults');
      next();
    }
  }else next()
})

export default router
