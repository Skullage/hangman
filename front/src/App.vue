<script setup>
import SocketioService from "./api/socketio.service.js";
import { onBeforeUnmount } from "vue";
import NicknameModal from "./components/Modals/nicknameModal.vue";
import store from "./store/index.js";
import { useRouter } from "vue-router";
import ErrorPopup from "./components/errorPopup.vue";

useRouter().push({ path: `/`, replace: true });

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
  <error-popup
    v-for="(item, index) in store.state.errors"
    :key="index"
    :index="index"
    :type="item.type"
    :msg="item.msg"
    :disappear-time="item.disappearTime"
  />
</template>

<style scoped></style>
