<script setup>
import SocketioService from "./api/socketio.service.js";
import { onBeforeUnmount } from "vue";
import NicknameModal from "./components/Modals/nicknameModal.vue";
import store from "./store/index.js";
import { useRouter } from "vue-router";

SocketioService.setupSocketConnection();
onBeforeUnmount(() => {
  SocketioService.disconnect();
});
if (store.getters.isLogined) {
  SocketioService.newUser({ name: store.state.username });
  useRouter().push({ path: `/`, replace: true });
}

if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  store.commit("toggleTheme", "dark");
}
</script>

<template>
  <router-view></router-view>
  <nickname-modal :show="!store.getters.isLogined" />
</template>

<style scoped></style>
