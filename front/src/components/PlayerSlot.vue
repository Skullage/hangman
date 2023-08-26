<script setup>
import { Icon } from "@iconify/vue";
import store from "../store/index.js";
import socketioService from "../api/socketio.service.js";

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
  playerName: {
    type: String,
    required: true,
  },
  isHost: {
    type: Boolean,
    default: false,
  },
});

const kickUser = async () => {
  const ok = await store.dispatch("showConfirm", {
    title: "Подтвердите действие",
    msg: `Вы действительно хотите кикнуть пользователя  ${
      store.state.rooms[store.state.roomId].clients.find(
        (el) => el.id === props.userId,
      ).name
    }`,
  });
  if (!ok) {
    socketioService.kickUser(props.userId);
  }
};
</script>

<template>
  <div
    class="border px-2 py-1 bg-fourthLight border-none text-thirdLight dark:text-white dark:bg-thirdDark rounded-xl flex gap-4 items-center"
  >
    <h2 class="flex-1">{{ playerName }}</h2>
    <icon
      icon="iconamoon:exit"
      v-if="!isHost && store.getters.isUserHost"
      class="cursor-pointer"
      @click="kickUser"
    />
    <icon icon="mdi:crown" v-if="isHost" />
  </div>
</template>

<style scoped></style>
