<script setup>
import PlayerSlot from "../components/PlayerSlot.vue";
import OverlayModal from "../components/Modals/OverlayModal.vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import store from "../store/index.js";
import socketioService from "../api/socketio.service.js";
import ChatWindow from "../components/ChatWindow.vue";
import Hangman from "../components/Games/Hangman/Hangman.vue";
import Simon from "../components/Games/Simon/Simon.vue";
import { shallowRef } from "vue";

const router = useRouter();
const currentGame = shallowRef({});

switch (store.getters["room/getRoomGame"]) {
  case "Виселица":
    currentGame.value = Hangman;
    break;
  case "Саймон говорит":
    currentGame.value = Simon;
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
  if (store.getters["room/getRoom"].clients.length === 1) {
    const ok = await store.dispatch("modals/showConfirm", {
      title: "Вы действительно хотите выйти?",
      msg: "Кроме вас в комнате никого нет, в случае вашего выхода комната будет удалена.",
    });
    if (!ok) {
      return;
    }
  }
  socketioService.leaveRoom(function () {
    router.push({ path: `/`, replace: true });
  });
};
</script>

<template>
  <div>
    <div
      class="grid min-h-[90vh] grid-cols-[1fr_0] duration-300"
      :class="{ 'lg:grid-cols-[1fr_25%]': store.state.chat.isChatShown }"
    >
      <div
        class="dark:bg-secondaryDark bg-thirdLight p-4 lg:p-16 rounded-t-2xl lg:rounded-2xl relative lg:flex-1 duration-300 h-full"
        :class="{
          'lg:rounded-tr-none lg:rounded-br-none': store.state.chat.isChatShown,
        }"
      >
        <div class="grid room-header justify-between items-start mb-12 gap-4">
          <button
            class="basis-8 flex-0 border p-2 rounded-2xl hover:bg-white hover:text-black duration-300 exit-btn"
            @click="leave"
            title="Выйти"
          >
            <icon icon="system-uicons:exit-left" width="32" />
          </button>
          <h1 class="flex-1 break-all room-title">
            {{ store.getters["room/getRoomTitle"] }}
          </h1>
          <button
            class="basis-8 flex-0 border p-2 rounded-2xl hover:bg-white hover:text-black duration-300 relative chat-btn"
            @click="store.commit('chat/toggleChat')"
            title="Чат"
          >
            <icon icon="mdi:message-outline" width="32" />
            <span
              class="w-5 h-5 flex items-center justify-center text-xs/none bg-red-700 absolute right-1 top-1 rounded-full text-white text-small"
              v-if="store.getters['chat/getUnreadMessagesCount'] > 0"
            >
              {{
                store.getters["chat/getUnreadMessagesCount"] < 100
                  ? store.getters["chat/getUnreadMessagesCount"]
                  : "99+"
              }}
            </span>
          </button>
        </div>
        <div
          class="flex lg:justify-between mb-10 flex-wrap justify-center gap-4"
        >
          <div class="grid grid-rows-auto gap-2 mb-10 md:mb-0 w-56">
            <player-slot
              v-for="(client, index) in store.getters['room/getUsers']"
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
        class="w-full duration-300 overflow-x-hidden h-full fixed lg:relative top-0 left-0 -translate-x-[1000px] lg:translate-x-0"
        :class="{
          'translate-x-0': store.state.chat.isChatShown,
        }"
      >
        <chat-window class="break-all" />
      </div>
    </div>
    <overlay-modal
      :show="store.getters['room/isGamePaused']"
      :title="store.getters['room/getGameStatus']"
    />
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
