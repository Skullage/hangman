<script setup>
import BaseInput from "../UI/Inputs/BaseInput.vue";
import { reactive, ref } from "vue";
import store from "../../store/index.js";
import CloseButton from "../UI/Buttons/CloseButton.vue";
import CustomButton from "../UI/Buttons/CustomButton.vue";
import socketioService from "../../api/socketio.service.js";
import router from "../../router/index.js";
import RoomsListModal from "./RoomsListModal.vue";

const emits = defineEmits(["update:modelValue"]);

const password = ref("");

const validate = reactive({
  password: "",
});

const connect = async (roomID) => {
  if (password.value.length > 0) {
    socketioService.joinRoom(roomID, password.value, function (roomId) {
      if (roomId) {
        router.push({ path: `/room/${roomId}`, replace: true });
        store.commit("modals/close");
      }
    });
  } else {
    validate.password = "Введите пароль";
  }
};

const closeModalWindow = () => {
  store.commit("modals/open", {
    view: RoomsListModal,
  });
};
</script>

<template>
  <div>
    <h3 class="mb-4 border-b py-8 text-center text-2xl z-50">Введите пароль</h3>
    <close-button @click="closeModalWindow" />
    <div class="overflow-y-auto p-6">
      <form @submit.prevent="connect(store.state.modals.props.roomId)">
        <base-input
          id="password"
          placeholder="Пароль"
          label="Пароль"
          type="password"
          v-model="password"
          class="mb-4"
          required
          :error="validate.password"
        ></base-input>
        <custom-button class="outlined-blue-btn w-full" type="submit"
          >Войти</custom-button
        >
      </form>
    </div>
  </div>
</template>
