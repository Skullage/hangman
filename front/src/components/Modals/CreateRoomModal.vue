<template>
  <base-modal>
    <h3 class="mb-4 border-b py-8 text-center text-2xl">Создание комнаты</h3>
    <close-button @click="closeModalWindow" />
    <div class="modal-content flex-1 overflow-y-auto px-4">
      <component :is="currentStep" @submit="createRoom" @next="nextStep" />
    </div>
  </base-modal>
</template>
<script setup>
import socketioService from "../../api/socketio.service.js";
import { useRouter } from "vue-router";
import store from "../../store/index.js";
import BaseModal from "./BaseModal.vue";

import BaseSettings from "./CreateRoomModal/BaseSettings.vue";
import HangmanSettings from "./CreateRoomModal/HangmanSettings.vue";
import { reactive, shallowRef } from "vue";
import SimonSettings from "./CreateRoomModal/SimonSettings.vue";
import CloseButton from "../UI/Buttons/CloseButton.vue";

const router = useRouter();

let roomSettings = reactive({});

let currentStep = shallowRef(BaseSettings);
const emits = defineEmits(["close"]);

const createRoom = async (event) => {
  roomSettings["options"] = event;
  socketioService.hostRoom(roomSettings, function (roomId) {
    store.commit("room/setRoomId", roomId);
    router.push({ path: `/room/${roomId}`, replace: false });
  });
};
const nextStep = (event) => {
  Object.assign(roomSettings, event);
  switch (event.game) {
    case "Виселица":
      currentStep.value = HangmanSettings;
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
  emits("close");
};
</script>
