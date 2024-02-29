<template>
  <base-modal @close="closeModalWindow">
    <h3 class="mb-4 border-b py-8 text-center text-2xl">Присоединиться</h3>
    <close-button @click="closeModalWindow" />
    <div class="overflow-y-auto">
      <form class="p-4">
        <base-input
          v-model="roomId"
          required
          label="Id комнаты"
          class="mb-4"
          ref="firstInput"
        ></base-input>
        <base-input v-model="password" label="Пароль" class="mb-2"></base-input>
        <custom-button class="outlined-blue-btn w-full" @click="connect">
          Подключиться
        </custom-button>
      </form>
    </div>
  </base-modal>
</template>
<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import BaseModal from "./BaseModal.vue";
import BaseInput from "../UI/Inputs/BaseInput.vue";
import CustomButton from "../UI/Buttons/CustomButton.vue";
import socketioService from "../../api/socketio.service.js";
import CloseButton from "../UI/Buttons/CloseButton.vue";
import store from "../../store/index.js";

const router = useRouter();

const emits = defineEmits(["close"]);

const roomId = ref("");
const password = ref("");
const firstInput = ref();
const closeModalWindow = () => {
  emits("close");
};

const connect = () => {
  socketioService.joinRoom(roomId.value, password.value, function (roomId) {
    router.push({ path: `/room/${roomId}`, replace: false });
  });
};

watch(
  () => store.state.modals.isJoinModalShown,
  (newValue) => {
    if (newValue) {
      firstInput.value.$refs.input.focus();
    }
  },
);
</script>
