import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;

  if(to.matched.some(record => record.meta.authRequired)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
      })
    } else {
        next()
    }
  } else {
    next()
  }
});

export default router
