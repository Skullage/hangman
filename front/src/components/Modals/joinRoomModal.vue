<template>
  <base-modal>
    <h3 class="mb-4 border-b py-8 text-center text-2xl">Присоединиться</h3>
    <button class="absolute right-3 top-3" @click="closeModalWindow">
      <Icon
        icon="material-symbols:close"
        width="24"
        height="24"
        class="text-black dark:text-white"
      />
    </button>
    <div class="overflow-y-auto px-4">
      <form class="py-4">
        <base-input
          v-model="roomId"
          required
          label="Id комнаты"
          class="mb-6"
        ></base-input>
        <base-input v-model="password" label="Пароль"></base-input>
      </form>
    </div>

    <div>
      <custom-button class="outlined-blue-btn w-full" @click="connect">
        Подключиться
      </custom-button>
    </div>
  </base-modal>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import BaseModal from "./BaseModal.vue";
import BaseInput from "../UI/Inputs/BaseInput.vue";
import CustomButton from "../UI/Buttons/CustomButton.vue";
import socketioService from "../../api/socketio.service.js";

const router = useRouter();

const emits = defineEmits(["close"]);

const roomId = ref("");
const password = ref("");

const closeModalWindow = () => {
  emits("close");
};

const connect = () => {
  socketioService.joinRoom(roomId.value, password.value, function (roomId) {
    router.push({ path: `/room/${roomId}`, replace: false });
  });
};
</script>
