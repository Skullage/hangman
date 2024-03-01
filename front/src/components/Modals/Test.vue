<template>
  <div>
    <h3 class="mb-4 border-b py-8 text-center text-2xl">Введите ник</h3>
    <div class="overflow-y-auto">
      <form class="p-4" @submit.prevent="setNick">
        <base-input
          v-model="nickname"
          placeholder="Ник"
          label="Ник"
          class="mb-2"
          required
          ref="firstInput"
        ></base-input>
        <custom-button class="w-full outlined-blue-btn" type="submit"
          >Подтвердить</custom-button
        >
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import store from "../../store/index.js";
import BaseInput from "../UI/Inputs/BaseInput.vue";
import CustomButton from "../UI/Buttons/CustomButton.vue";

const nickname = ref("");
const firstInput = ref();

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
  if (store.getters["user/isLogined"]) {
    store.commit("user/changeNickname", nickname.value);
  } else {
    store.commit("user/auth", nickname.value);
  }
  store.commit("newModal/close");
};

watch(
  () => store.getters["user/isLogined"],
  (newValue) => {
    if (!newValue) {
      firstInput.value.$refs.input.focus();
    }
  },
);
</script>
