<template>
  <div>
    <h3 class="mb-4 border-b py-8 text-center text-2xl">Присоединиться</h3>
    <close-button @click="store.commit('modals/close')" />
    <div class="overflow-y-auto p-6">
      <form @submit.prevent="validateForm">
        <base-input
          id="room-id"
          v-model="roomId"
          required
          label="Id комнаты"
          class="mb-8"
          icon="fluent:weather-snow-shower-night-48-filled"
          :error="validate.roomId"
        ></base-input>
        <base-input
          id="room-password"
          v-model="password"
          type="password"
          label="Пароль"
          class="mb-4"
          :error="validate.password"
        ></base-input>
        <custom-button class="outlined-blue-btn w-full" type="submit">
          Подключиться
        </custom-button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import BaseInput from "../UI/Inputs/BaseInput.vue";
import CustomButton from "../UI/Buttons/CustomButton.vue";
import socketioService from "../../api/socketio.service.js";
import CloseButton from "../UI/Buttons/CloseButton.vue";
import store from "../../store/index";

const router = useRouter();

const roomId = ref("");
const password = ref("");
const validate = reactive({
  roomId: "",
  password: "",
});

const validateForm = () => {
  let isErrors = false;
  if (roomId.value.length === 0) {
    validate.roomId = "Введите ID комнаты";
    isErrors = true;
  }
  if (!isErrors) {
    connect();
  }
};

const connect = () => {
  socketioService.joinRoom(roomId.value, password.value, function (roomId) {
    router.push({ path: `/room/${roomId}`, replace: false });
  });
};
</script>
