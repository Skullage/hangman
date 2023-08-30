<script setup>
import BaseModal from "./BaseModal.vue";
import OutlinedBlueButton from "../UI/Buttons/OutlinedBlueButton.vue";
import BaseInput from "../UI/Inputs/BaseInput.vue";
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import store from "../../store/index.js";

const emits = defineEmits(["close"]);

const password = ref("");

const sendPassword = async () => {
  if (password.value.length > 0) {
    store.state.passwordModal.password = password.value;
    store.state.passwordModal.resolvePromise(true);
    emits("close");
  }
};

const closeModalWindow = () => {
  store.state.passwordModal.resolvePromise(false);
  emits("close");
};
</script>

<template>
  <base-modal>
    <h3 class="mb-4 border-b py-8 text-center text-2xl z-50">Введите пароль</h3>
    <button class="absolute right-3 top-3" @click="closeModalWindow">
      <Icon
        icon="material-symbols:close"
        width="24"
        height="24"
        class="text-black dark:text-white"
      />
    </button>
    <div class="overflow-y-auto px-4">
      <form class="p-4">
        <base-input
          placeholder="Пароль"
          label="Пароль"
          type="password"
          v-model="password"
          required
        ></base-input>
      </form>
    </div>

    <div>
      <outlined-blue-button @click="sendPassword" class="w-full"
        >Подтвердить</outlined-blue-button
      >
    </div>
  </base-modal>
</template>
