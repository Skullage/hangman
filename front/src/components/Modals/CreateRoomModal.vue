<template>
  <div>
    <h3 class="mb-4 border-b py-8 text-center text-2xl">Создание комнаты</h3>
    <close-button @click="closeModalWindow" />
    <div class="overflow-y-auto p-6">
      <component :is="currentStep" @submit="createRoom" @next="nextStep" />
    </div>
  </div>
</template>
<script setup>
import socketioService from "../../api/socketio.service.js";
import { useRouter } from "vue-router";
import store from "../../store/index";

import BaseSettings from "./CreateRoomModal/BaseSettings.vue";
import HangmanSettings from "./CreateRoomModal/HangmanSettings.vue";
import { reactive, shallowRef } from "vue";
import SimonSettings from "./CreateRoomModal/SimonSettings.vue";
import WordleSettings from "./CreateRoomModal/WordleSettings.vue"
import CloseButton from "../UI/Buttons/CloseButton.vue";

const router = useRouter();

let roomSettings = reactive({});

let currentStep = shallowRef(BaseSettings);

const createRoom = async (event) => {
  roomSettings["options"] = event;
  socketioService.hostRoom(roomSettings, function (roomId) {
    store.commit("room/setRoomId", roomId);
    router.push({ path: `/room/${roomId}`, replace: false });
  });
  store.commit("modals/close");
};
const nextStep = (event) => {
  Object.assign(roomSettings, event);
  switch (event.game) {
    case "Виселица":
      currentStep.value = HangmanSettings;
      break;
    case "Wordle":
      currentStep.value = WordleSettings;
      break;
    case "Саймон говорит":
      currentStep.value = SimonSettings;
      break;
    default:
      createRoom(null);
  }
};
const closeModalWindow = () => {
  currentStep.value = BaseSettings;
  roomSettings = {};
  store.commit("modals/close");
};
</script>
