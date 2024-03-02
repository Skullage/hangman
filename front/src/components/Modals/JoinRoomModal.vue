<template>
  <div>
    <h3 class="mb-4 border-b py-8 text-center text-2xl">Присоединиться</h3>
    <close-button @click="store.commit('newModal/close')" />
    <div class="overflow-y-auto p-6">
      <form @submit.prevent="connect">
        <base-input
          v-model="roomId"
          required
          label="Id комнаты"
          class="mb-4"
        ></base-input>
        <base-input v-model="password" label="Пароль" class="mb-2"></base-input>
        <custom-button class="outlined-blue-btn w-full">
          Подключиться
        </custom-button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import BaseInput from "../UI/Inputs/BaseInput.vue";
import CustomButton from "../UI/Buttons/CustomButton.vue";
import socketioService from "../../api/socketio.service.js";
import CloseButton from "../UI/Buttons/CloseButton.vue";
import store from "../../store/index.js";

const router = useRouter();

const roomId = ref("");
const password = ref("");

const connect = () => {
  socketioService.joinRoom(roomId.value, password.value, function (roomId) {
    router.push({ path: `/room/${roomId}`, replace: false });
  });
};
</script>
