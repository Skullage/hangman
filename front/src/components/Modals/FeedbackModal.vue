<script setup>
import CustomButton from "../UI/Buttons/CustomButton.vue";
import BaseInput from "../UI/Inputs/BaseInput.vue";
import { ref } from "vue";
import BaseTextarea from "../UI/Inputs/BaseTextarea.vue";
import CloseButton from "../UI/Buttons/CloseButton.vue";
import api from "../../api/api.js";
import store from "../../store/index.js";

const emits = defineEmits(["close"]);

const email = ref("");
const msg = ref("");

const sendFeedback = async () => {
  if (email.value.length < 1) {
    store.commit("notification/addNotification", {
      type: "error",
      msg: "Введите E-mail.",
    });
    return;
  }
  if (msg.value.length < 1) {
    store.commit("notification/addNotification", {
      type: "error",
      msg: "Введите сообщение",
    });
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
          class="mb-4"
          label="E-mail"
          v-model="email"
        />
        <base-textarea
          label="Сообщение"
          placeholder="Сообщение"
          class="mb-2"
          v-model="msg"
        />
        <custom-button type="submit" class="outlined-blue-btn w-full"
          >Отправить</custom-button
        >
      </form>
    </div>
  </div>
</template>
