const routes = [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
          title: "Hangman"
      },
    },
    {
        path: '/room/:id',
        name: 'room',
        component: () => import('../views/RoomView.vue'),
        meta: {
            title: "Hangman"
        },
    },
    { 
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: () => import('../views/NotFound.vue'),
      meta: {
          title: "ОШИБКА 404 - Страница не найдена"
      },
    },
]

export default routes