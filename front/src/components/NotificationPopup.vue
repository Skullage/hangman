<script setup>
import { Icon } from "@iconify/vue";
import store from "../store/index.js";

const closeError = () => {
  store.commit("notification/closeNotification");
};
</script>

<template>
  <div
    class="error absolute left-1/2 -translate-x-1/2 top-5 rounded-lg w-full md:w-1/2 px-4 py-2 text-left text-primaryDark flex items-center gap-2 z-50 duration-500 -translate-y-[200px]"
    :class="[
      store.getters['notification/getClass'],
      { 'translate-y-0': !store.getters['notification/isEmpty'] },
    ]"
  >
    <icon
      :icon="store.getters['notification/getIcon']"
      width="32"
      height="32"
    />
    <p>{{ store.getters["notification/getMsg"] }}</p>
    <button class="absolute right-3 top-1" @click="closeError">
      <Icon icon="material-symbols:close" width="24" height="24" />
    </button>
  </div>
</template>
