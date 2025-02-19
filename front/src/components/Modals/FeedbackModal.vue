<script setup>
import CustomButton from "../UI/Buttons/CustomButton.vue";
import BaseInput from "../UI/Inputs/BaseInput.vue";
import { reactive, ref } from "vue";
import BaseTextarea from "../UI/Inputs/BaseTextarea.vue";
import CloseButton from "../UI/Buttons/CloseButton.vue";
import api from "../../api/api.js";
import store from "../../store/index";

const emits = defineEmits(["close"]);

const email = ref("");
const msg = ref("");

const validate = reactive({
  email: "",
  msg: "",
});

const sendFeedback = async () => {
  let isErrors = false;
  if (email.value.length < 1) {
    validate.email = "Введите E-mail";
    isErrors = true;
  }
  if (msg.value.length < 1) {
    validate.email = "Введите сообщение";
    isErrors = true;
  }
  if (isErrors) {
    return;
  }
  await api
    .post("/feedback/send", {
      email: email.value,
      msg: msg.value,
    })
    .then(() => {
      store.commit("modals/close");
      store.commit("notification/addNotification", {
        type: "success",
        msg: "Ваше сообщение успешно отправлено администратору.",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<template>
  <div>
    <h3 class="mb-4 border-b py-8 text-center text-2xl">Обратная связь</h3>
    <close-button @click="store.commit('modals/close')" />
    <div class="overflow-y-auto p-6">
      <form @submit.prevent="sendFeedback">
        <base-input
          type="email"
          placeholder="E-mail"
          class="mb-8"
          label="E-mail"
          v-model="email"
          required
          :error="validate.email"
        />
        <base-textarea
          label="Сообщение"
          placeholder="Сообщение"
          class="mb-2"
          v-model="msg"
          required
          :error="validate.msg"
        />
        <custom-button type="submit" class="outlined-blue-btn w-full"
          >Отправить</custom-button
        >
      </form>
    </div>
  </div>
</template>
