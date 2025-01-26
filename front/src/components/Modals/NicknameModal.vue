<template>
  <div>
    <h3 class="mb-4 border-b py-8 text-center text-2xl">Введите ник</h3>
    <div class="overflow-y-auto p-6">
      <form @submit.prevent="setNick">
        <base-input
          id="nick"
          v-model="nickname"
          placeholder="Ник"
          label="Ник"
          class="mb-4"
          required
          :error="validate.nickname"
        ></base-input>
        <custom-button class="w-full outlined-blue-btn" type="submit"
          >Подтвердить</custom-button
        >
      </form>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import store from "../../store/index.js";
import BaseInput from "../UI/Inputs/BaseInput.vue";
import CustomButton from "../UI/Buttons/CustomButton.vue";

const nickname = ref("");
const validate = reactive({
  nickname: "",
});

const setNick = async () => {
  let isErrors = false;
  if (nickname.value.length < 1) {
    validate.nickname = "Введите ник";
    isErrors = true;
  } else if (nickname.value.length > 16) {
    validate.nickname = "Длина ника не должна превышать 16 символов";
    isErrors = true;
  }
  if (isErrors) {
    return;
  }
  if (store.getters["user/isLogined"]) {
    store.commit("user/changeNickname", nickname.value);
  } else {
    store.commit("user/auth", nickname.value);
  }
  store.commit("modals/close");
};
</script>
