<script setup>
import { Icon } from "@iconify/vue";
import store from "../store/index.js";
import socketioService from "../api/socketio.service.js";
import { computed } from "vue";

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
  index: {
    type: Number,
    required: true,
  },
});

const kickUser = async () => {
  let client = store.getters.getRoom.clients.find(
    (el) => el.uniqueId === props.userId,
  );
  const ok = await store.dispatch("showConfirm", {
    title: "Подтвердите действие",
    msg: `Вы действительно хотите выгнать пользователя  ${client.name}?`,
  });
  if (ok) {
    socketioService.kickUser(client.id);
  }
};

const isPlayerTurn = computed(() => {
  return (
    props.userId === store.getters.getRoom.turnUserID &&
    store.state.turnTimer > 0
  );
});
</script>

<template>
  <div class="grid grid-cols-[1fr_40px] items-center">
    <div
      class="border px-2 py-1 border-none dark:text-white dark:bg-thirdDark rounded-l flex gap-4 items-center flex-1 bg-secondaryLight text-black"
      :class="{ rounded: !isPlayerTurn }"
    >
      <h2
        class="flex-1"
        :style="`color: ${store.getters.getUserColor(props.index)}`"
      >
        {{ playerName }}
      </h2>
      <div title="Выгнать игрока">
        <icon
          icon="iconamoon:exit"
          v-if="!isHost && store.getters.isUserHost"
          class="cursor-pointer"
          @click="kickUser"
        />
      </div>
      <div title="Хост">
        <icon icon="mdi:crown" v-if="isHost" title="Host" />
      </div>
    </div>
    <div
      v-show="isPlayerTurn"
      class="bg-fourthDark py-1 px-3 rounded-r flex-shrink-0 flex-grow-0 basis-10 text-center"
    >
      {{ store.state.turnTimer }}
    </div>
  </div>
</template>
