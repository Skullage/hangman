<script setup>
import { Icon } from "@iconify/vue";
import store from "../store/index.js";
import socketioService from "../api/socketio.service.js";
import { computed } from "vue";
import ConfirmModal from "./Modals/ConfirmModal.vue";

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
  let client = store.getters["room/getRoom"].clients.find(
    (el) => el.uniqueId === props.userId,
  );
  store.commit("newModal/open", {
    view: ConfirmModal,
    props: {
      title: "Выгнать игрока?",
      msg: `Он будет добавлен в черный список комнаты`,
    },
    actions: [
      {
        label: "Выгнать",
        btnClass: "red-btn",
        callback: () => {
          socketioService.kickUser(client.id);
          store.commit("newModal/close");
        },
      },
      {
        label: "Отмена",
        btnClass: "outlined-blue-btn",
        callback: () => {
          store.commit("newModal/close");
        },
      },
    ],
  });
};

const isPlayerTurn = computed(() => {
  return (
    props.userId === store.getters["room/getRoom"].turnUserID &&
    store.state.room.turnTimer > 0
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
        :style="`color: ${store.getters['room/getUserColor'](props.index)}`"
      >
        {{ playerName }}
      </h2>
      <div title="Выгнать игрока">
        <icon
          icon="iconamoon:exit"
          v-if="!isHost && store.getters['room/isUserHost']"
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
      {{ store.state.room.turnTimer }}
    </div>
  </div>
</template>
