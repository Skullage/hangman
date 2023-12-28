<template>
  <base-modal>
    <h3 class="mb-4 border-b py-8 text-center text-2xl">Введите ник</h3>
    <div class="overflow-y-auto px-4">
      <form class="p-4">
        <base-input
          v-model="nickname"
          placeholder="Ник"
          label="Ник"
          required
        ></base-input>
      </form>
    </div>

    <div>
      <custom-button @click="setNick" class="w-full outlined-blue-btn"
        >Подтвердить</custom-button
      >
    </div>
  </base-modal>
</template>
<script setup>
import { ref } from "vue";
import store from "../../store/index.js";
import BaseModal from "./BaseModal.vue";
import BaseInput from "../UI/Inputs/BaseInput.vue";
import CustomButton from "../UI/Buttons/CustomButton.vue";

const nickname = ref("");

const setNick = async () => {
  if (nickname.value.length < 1) {
    return store.commit("notification/addNotification", {
      type: "error",
      msg: "Введите ник",
    });
  }
  if (nickname.value.length > 16) {
    return store.commit("notification/addNotification", {
      type: "error",
      msg: "Длина ника не должна превышать 16 символов",
    });
  }
  store.commit("user/setUsername", nickname.value);
};
</script>
