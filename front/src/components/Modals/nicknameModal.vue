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
      <outlined-blue-button @click="setNick" class="w-full"
        >Подтвердить</outlined-blue-button
      >
    </div>
  </base-modal>
</template>
<script setup>
import { ref } from "vue";
import store from "../../store/index.js";
import BaseModal from "./BaseModal.vue";
import OutlinedBlueButton from "../UI/Buttons/OutlinedBlueButton.vue";
import BaseInput from "../UI/Inputs/BaseInput.vue";

const nickname = ref("");

const setNick = async () => {
  if (nickname.value.length > 0) {
    store.commit("setUsername", nickname.value);
  }
};
</script>
