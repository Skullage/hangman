<script setup>
import PlayerSlot from "../components/PlayerSlot.vue";
import CharSlot from "../components/CharSlot.vue";
import OverlayModal from "../components/Modals/OverlayModal.vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import store from "../store/index.js";
import socketioService from "../api/socketio.service.js";
import BaseButton from "../components/UI/Buttons/BaseButton.vue";
import ChatWindow from "../components/ChatWindow.vue";

const router = useRouter();

const checkChar = (char) => {
  socketioService.checkChar(char);
};

const copyId = (event) => {
  navigator.clipboard.writeText(event.target.innerText);
  store.commit("addError", {
    type: "success",
    msg: "Id комнаты скопирован",
    disappearTime: 3000,
  });
};

const leave = async () => {
  if (store.state.rooms[store.state.roomId].clients.length === 1) {
    const ok = await store.dispatch("showConfirm", {
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
  <div class="flex">
    <div
      class="dark:bg-secondaryDark bg-thirdLight p-4 lg:p-16 rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl relative flex-1"
    >
      <div class="flex justify-between items-start mb-12 flex-wrap gap-4">
        <button
          class="basis-8 flex-0 border p-2 rounded-2xl hover:bg-white hover:text-black duration-300"
          @click="leave"
        >
          <icon icon="system-uicons:exit-left" width="32" />
        </button>
        <h1 class="flex-1">{{ store.getters.getRoomTitle }}</h1>
      </div>
      <div class="flex justify-between items-center mb-10">
        <div>
          <p>ID комнаты</p>
          <p class="cursor-pointer" @click="copyId">
            {{ store.state.roomId }}
          </p>
        </div>
        <div>
          <p>Осталось жизней</p>
          <p>{{ store.getters.getLivesLast + 1 }}</p>
        </div>
      </div>

      <div
        class="flex md:justify-between flex-wrap justify-center mb-10 items-start"
      >
        <div class="grid grid-rows-auto gap-2 mb-10 md:mb-0">
          <player-slot
            v-for="(client, index) in store.getters.getUsers"
            :key="index"
            :player-name="client.name"
            :isHost="client.isHost"
            :user-id="client.id"
            class="text-left"
          />
        </div>
        <div :class="store.getters.getLivesClass" class="human"></div>
      </div>

      <div class="word flex flex-wrap justify-center mb-10 gap-2">
        <char-slot
          v-for="(slot, index) in store.getters.getWord"
          :key="index"
          :char="slot"
          :show-char="true"
        />
      </div>
      <div class="word flex justify-center flex-wrap gap-3">
        <base-button
          v-for="(slot, index) in store.getters.getCharSlots"
          :key="index"
          class="text-xl dark:bg-fourthDark dark:text-fifthDark basis-14 flex-initial dark:hover:border-thirdDark hover:border-4 !border-4 border-transparent"
          :disabled="slot.disabled"
          @click="checkChar(slot.char)"
        >
          {{ slot.char.toUpperCase() }}
        </base-button>
        <button
          class="p-0 focus:outline-none hover:outline-none"
          :class="{ 'bg-gray-200': store.getters.isGamePaused }"
        ></button>
      </div>
    </div>
    <div class="basis-full lg:basis-1/4">
      <chat-window />
    </div>
  </div>
  <overlay-modal
    :show="store.getters.isGamePaused"
    :title="store.getters.getGameStatus"
  />
</template>

<style scoped></style>
