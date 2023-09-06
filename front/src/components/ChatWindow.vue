<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import store from "../store/index.js";
import socketioService from "../api/socketio.service.js";
import BaseTextarea from "./UI/Inputs/BaseTextarea.vue";

const message = ref("");

const sendMessage = () => {
  if (message.value.length === 0) {
    return;
  }
  socketioService.sendMessage({
    name: store.state.username,
    message: message.value,
    color: "inherit",
  });
  message.value = "";
};
</script>

<template>
  <div
    class="border h-full text-left p-2 flex flex-col rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none bg-fourthLight dark:bg-inherit"
  >
    <div class="flex-1 pb-4">
      <p
        v-for="(item, index) in store.state.messages"
        :key="index"
        :class="`text-${item.color}`"
      >
        {{ item.name + ": " + item.msg }}
      </p>
    </div>
    <form class="flex gap-2 items-center" @submit.prevent="sendMessage">
      <base-textarea v-model="message" class="flex-1"></base-textarea>
      <button>
        <icon icon="fe:paper-plane" width="32"></icon>
      </button>
    </form>
  </div>
</template>
