<script setup>
import SocketioService from "./api/socketio.service.js";
import { onBeforeUnmount } from "vue";
import NicknameModal from "./components/Modals/nicknameModal.vue";
import store from "./store/index.js";
import { useRouter } from "vue-router";
import NotificationPopup from "./components/NotificationPopup.vue";
import ConfirmModal from "./components/Modals/confirmModal.vue";

useRouter().push({ path: `/`, replace: true });

if (store.getters["user/isLogined"]) {
  SocketioService.setupSocketConnection();
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
  <nickname-modal :show="!store.getters['user/isLogined']" />
  <notification-popup />
  <confirm-modal
    :show="store.state.modals.confirmModal.isShow"
    @close="store.state.modals.confirmModal.isShow = false"
  />
</template>
