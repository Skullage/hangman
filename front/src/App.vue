<script setup>
import SocketioService from "./api/socketio.service.js";
import { onBeforeUnmount } from "vue";
import store from "./store/index.js";
import { useRouter } from "vue-router";
import NotificationPopup from "./components/NotificationPopup.vue";
import BaseModalNew from "./components/Modals/BaseModalNew.vue";
import NicknameModal from "./components/Modals/NicknameModal.vue";

useRouter().push({ path: `/`, replace: true });

if (store.getters["user/isLogined"]) {
  SocketioService.setupSocketConnection();
} else {
  store.commit("newModal/open", {
    view: NicknameModal,
  });
}

onBeforeUnmount(() => {
  SocketioService.disconnect();
});

if (store.getters["theme/isDarkTheme"]) {
  store.commit("theme/toggleTheme", "dark");
}
</script>

<template>
  <router-view></router-view>
  <notification-popup />
  <base-modal-new />
</template>
