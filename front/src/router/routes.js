import HomeView from "../views/HomeView.vue";
import RoomView from "../views/RoomView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Play-Together",
      transition: "slide-left",
    },
  },
  {
    path: "/room/:id",
    name: "room",
    component: RoomView,
    meta: {
      title: "Play-Together",
      transition: "slide-right",
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
    meta: {
      title: "ОШИБКА 404 - Страница не найдена",
    },
  },
];

export default routes;
