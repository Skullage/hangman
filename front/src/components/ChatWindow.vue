<script setup>
import BaseInput from "./UI/Inputs/BaseInput.vue";
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import store from "../store/index.js";
import socketioService from "../api/socketio.service.js";

const message = ref("");

const sendMessage = () => {
  socketioService.sendMessage({
    name: store.state.username,
    message: message.value,
    color: "inherit",
  });
  message.value = "";
};
</script>

<template>
  <div class="border h-full text-left p-2 flex flex-col rounded-r-2xl">
    <div class="flex-1 pb-4">
      <p
        v-for="(item, index) in store.state.messages"
        :key="index"
        :class="`text-${item.color}`"
      >
        {{ item.name + ": " + item.msg }}
      </p>
    </div>
    <form class="relative" @submit.prevent="sendMessage">
      <base-input v-model="message" class="p-2"></base-input>
      <button class="absolute right-5 top-1/2 -translate-y-1/2">
        <icon icon="fe:paper-plane" width="24"></icon>
      </button>
    </form>
  </div>
</template>
