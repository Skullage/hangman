<script setup>
import socketioService from "../api/socketio.service.js";
import store from "../store/index.js";
const emits = defineEmits(["close"]);

const sendEmoji = (smile) => {
  socketioService.sendMessage({
    name: store.state.user.username,
    message: smile,
    color: store.getters["room/getUserColor"](
      store.getters["room/getUserSlot"],
    ),
    type: "smile",
  });
  emits("close");
};
</script>

<template>
  <div
    class="grid grid-cols-5 border rounded text-center gap-2 dark:bg-primaryDark overflow-y-auto overflow-x-hidden"
  >
    <img
      :src="`/smiles/${item}.gif`"
      width="64"
      v-for="item in 49"
      :key="item"
      class="cursor-pointer mx-auto"
      alt="Смайл обезьянка"
      @click="sendEmoji(item)"
    />
  </div>
</template>

<style scoped></style>
