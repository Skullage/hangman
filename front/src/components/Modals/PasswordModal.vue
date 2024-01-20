<script setup>
import BaseModal from "./BaseModal.vue";
import CustomButton from "../UI/Buttons/CustomButton.vue";
import BaseInput from "../UI/Inputs/BaseInput.vue";
import { ref } from "vue";
import store from "../../store/index.js";
import CloseButton from "../UI/Buttons/CloseButton.vue";

const emits = defineEmits(["close"]);

const password = ref("");

const sendPassword = async () => {
  if (password.value.length > 0) {
    store.state.modals.passwordModal.password = password.value;
    store.state.modals.passwordModal.resolvePromise(true);
    emits("close");
  }
};

const closeModalWindow = () => {
  store.state.modals.passwordModal.resolvePromise(false);
  emits("close");
};
</script>

<template>
  <base-modal>
    <h3 class="mb-4 border-b py-8 text-center text-2xl z-50">Введите пароль</h3>
    <close-button @click="closeModalWindow" />
    <div class="overflow-y-auto px-4">
      <form class="p-4">
        <base-input
          placeholder="Пароль"
          label="Пароль"
          type="password"
          v-model="password"
          class="mb-2"
          required
        ></base-input>
        <custom-button @click="sendPassword" class="outlined-blue-btn w-full"
          >Подтвердить</custom-button
        >
      </form>
    </div>
  </base-modal>
</template>
