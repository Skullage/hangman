<script setup>
import PlayerSlot from "../components/PlayerSlot.vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import store from "../store/index";
import socketioService from "../api/socketio.service.js";
import ChatWindow from "../components/ChatWindow.vue";
import Hangman from "../components/Games/Hangman/Hangman.vue";
import Simon from "../components/Games/Simon/Simon.vue";
import { shallowRef, watch, computed } from "vue";
import ConfirmModal from "../components/Modals/ConfirmModal.vue";
import OverlayModal from "../components/Modals/OverlayModal.vue";
import Wordle from "../components/Games/Wordle/Wordle.vue";

const router = useRouter();
const currentGame = shallowRef({});

const unreadMessagesCount = computed(() => store.getters['chat/getUnreadMessagesCount']);
const users = computed(() => store.getters['room/getUsers']);
const room = computed(() => store.getters['room/getRoom']);

switch (room.value.game) {
  case "Виселица":
    currentGame.value = Hangman;
    break;
  case "Саймон говорит":
    currentGame.value = Simon;
    break;
  case "Wordle":
    currentGame.value = Wordle;
    break;
  default:
    currentGame.value = "";
}

const copyId = (event) => {
  navigator.clipboard.writeText(event.target.innerText);
  store.commit("notification/addNotification", {
    type: "success",
    msg: "Id комнаты скопирован",
    disappearTime: 3000,
  });
};

const leave = async () => {
  if (room.value.clients.length === 1) {
    store.commit("modals/open", {
      view: ConfirmModal,
      props: {
        title: "Выйти с комнаты?",
        msg: `Комната будет удалена`,
      },
      actions: [
        {
          label: "Выйти",
          btnClass: "red-btn",
          callback: () => {
            socketioService.leaveRoom(function () {
              router.push({ path: `/`, replace: true });
            });
            store.commit("modals/close");
          },
        },
        {
          label: "Остаться",
          btnClass: "outlined-blue-btn",
          callback: () => {
            store.commit("modals/close");
          },
        },
      ],
    });
  } else {
    socketioService.leaveRoom(function () {
      router.push({ path: `/`, replace: true });
    });
  }
};

const getChatMaxHeight = computed(() => {
  const chatHeight = window.innerHeight - 100;
  const chatMaxHeight = chatHeight - 100;
  return `max-height: ${chatMaxHeight} px`;
})

watch(
  () => store.getters["room/isGamePaused"],
  (newValue) => {
    if (newValue) {
      store.commit("modals/open", {
        view: OverlayModal,
        props: { title: room.value.gameStatus.status },
      });
    }
  },
);
</script>

<template>
  <div
    class="grid grid-cols-[1fr_0] min-h-[90vh] duration-300"
    :class="{ 'lg:grid-cols-[1fr_25%]': store.state.chat.isChatShown }"
  >
    <div
      class="dark:bg-secondaryDark bg-thirdLight p-4 px-8 rounded-t-2xl lg:rounded-2xl relative lg:flex-1 duration-300 max-h-[90vh]"
      :class="{
        'lg:rounded-tr-none lg:rounded-br-none': store.state.chat.isChatShown,
      }"
    >
      <div class="grid room-header justify-between items-start mt-4 mb-8 gap-4">
        <button
          class="basis-8 flex-0 border p-2 rounded-2xl hover:bg-white hover:text-black duration-300 exit-btn"
          @click="leave"
          title="Выйти"
        >
          <icon icon="system-uicons:exit-left" width="32" />
        </button>
        <h1 class="flex-1 break-all room-title">
          {{ room.title }}
        </h1>
        <button
          class="basis-8 flex-0 border p-2 rounded-2xl hover:bg-white hover:text-black duration-300 relative chat-btn"
          @click="store.commit('chat/toggleChat')"
          title="Чат"
        >
          <icon icon="mdi:message-outline" width="32" />
          <span
            class="w-5 h-5 flex items-center justify-center text-xs/none bg-red-700 absolute right-1 top-1 rounded-full text-white text-small"
            v-if="unreadMessagesCount > 0"
          >
            {{
              unreadMessagesCount < 100
                ? unreadMessagesCount
                : "99+"
            }}
          </span>
        </button>
      </div>
      <div class="flex md:justify-between mb-8 flex-wrap justify-center gap-4">
        <div class="grid grid-rows-auto gap-2 mb-10 md:mb-0 w-56">
          <player-slot
            v-for="(client, index) in users"
            :key="index"
            :player-name="client.name"
            :isHost="client.isHost"
            :user-id="client.uniqueId"
            :index="index"
            class="text-left"
          />
        </div>
        <div>
          <p>ID комнаты</p>
          <p class="cursor-pointer" @click="copyId" title="Скопировать ID">
            {{ store.state.room.roomId }}
            <icon
              icon="tabler:clipboard-copy"
              class="cursor-pointer inline-block align-top"
              width="20"
              height="20"
            ></icon>
          </p>
        </div>
      </div>
      <component :is="currentGame"></component>
    </div>
    <div
      class="w-full duration-300 overflow-x-hidden fixed lg:relative top-0 left-0 -translate-x-[1000px] lg:translate-x-0"
      :class="{
        '!translate-x-0': store.state.chat.isChatShown,
      }"
      :style="getChatMaxHeight"
    >
      <chat-window class="break-all" />
    </div>
  </div>
</template>
<style>
.text-small {
  font-size: 10px;
}
.room-header {
  grid-template-areas: "exit title chat";
  @media screen and (max-width: 768px) {
    grid-template-areas:
      "exit chat"
      "title title";
  }
}
.chat-btn {
  grid-area: chat;
}
.room-title {
  grid-area: title;
}
.exit-btn {
  grid-area: exit;
}
</style>
