<script setup>
import BaseModal from "./BaseModal.vue";
import CustomButton from "../UI/Buttons/CustomButton.vue";
import BaseInput from "../UI/Inputs/BaseInput.vue";
import { ref } from "vue";
import BaseTextarea from "../UI/Inputs/BaseTextarea.vue";
import CloseButton from "../UI/Buttons/CloseButton.vue";
import api from "../../api/api.js";

const emits = defineEmits(["close"]);

const email = ref("123@mail.ru");
const msg = ref("234234");

const sendFeedback = async () => {
  await api
    .post("/feedback/send", {
      email: email.value,
      msg: msg.value,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

const closeModalWindow = () => {
  emits("close");
};
</script>

<template>
  <base-modal>
    <h3 class="mb-4 border-b py-8 text-center text-2xl z-40">Обратная связь</h3>
    <close-button @click="closeModalWindow" />
    <div class="overflow-y-auto px-4">
      <form class="p-4" @submit.prevent="sendFeedback">
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
  </base-modal>
</template>
