<script setup>
import socketioService from "../api/socketio.service.js";
import store from "../store/index.js";
const emits = defineEmits(["close"]);

const sendEmoji = (smile) => {
  socketioService.sendMessage({
    name: store.state.username,
    message: smile,
    color: store.getters.getUserColor(store.getters.getUserSlot),
    type: "smile",
  });
  emits("close");
};
</script>

<template>
  <div
    class="grid grid-cols-5 border rounded text-center gap-2 p-2 dark:bg-primaryDark overflow-auto max-h-[300px] overflow-x-hidden"
  >
    <img
      :src="`/smiles/${item}.gif`"
      v-for="item in 49"
      :key="item"
      class="cursor-pointer"
      alt="Смайл обезьянка"
      @click="sendEmoji(item)"
    />
  </div>
</template>

<style scoped></style>
