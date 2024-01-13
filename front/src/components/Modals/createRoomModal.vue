<template>
  <base-modal>
    <h3 class="mb-4 border-b py-8 text-center text-2xl">Создание комнаты</h3>
    <button class="absolute right-3 top-3" @click="closeModalWindow">
      <Icon icon="material-symbols:close" width="24" height="24" />
    </button>
    <div class="modal-content flex-1 overflow-y-auto px-4">
      <component :is="currentStep" @submit="createRoom" />
    </div>
  </base-modal>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import socketioService from "../../api/socketio.service.js";
import { useRouter } from "vue-router";
import store from "../../store/index.js";
import BaseModal from "./BaseModal.vue";

import BaseSettings from "./CreateRoomModal/BaseSettings.vue";
import ExtraSettings from "./CreateRoomModal/ExtraSettings.vue";
import { reactive, shallowRef } from "vue";

const router = useRouter();

let roomSettings = reactive({});

let currentStep = shallowRef(BaseSettings);
const emits = defineEmits(["close"]);

const createRoom = async (event) => {
  if (currentStep.value.__name === "BaseSettings") {
    Object.assign(roomSettings, event);
    return (currentStep.value = ExtraSettings);
  }
  Object.assign(roomSettings, event);
  socketioService.hostRoom(roomSettings, function (roomId) {
    store.commit("room/setRoomId", roomId);
    router.push({ path: `/room/${roomId}`, replace: false });
  });
};
const closeModalWindow = () => {
  currentStep.value = BaseSettings;
  roomSettings = {};
  emits("close");
};
</script>
